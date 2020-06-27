using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Cronos;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using System.Net;
using System.Reactive;

namespace EmployeeCentre {
    class TimingService : IHostedService, IDisposable {
        private Task _executingTask;
        private List<SchedulingJobDetails> _timingJobs;
        private int _currentVersion; 

        protected TimingService(NotificationModel model) {
            _currentVersion = model.Version;
            foreach (NotificationQuestionModel question in model.NotificationQuestion) {
                _timingJobs.Add(new SchedulingJobDetails {
                    question = question,
                    cronExpression = CronExpression.Parse(question.Frequency)
                });
            }
        }

        #nullable enable
        private void _RegisterNotificationModel(NotificationModel model) {
            _currentVersion = model.Version;
            foreach (SchedulingJobDetails oldQuestion in _timingJobs) {
                bool idFound = false;
                foreach (NotificationQuestionModel newQuestion in model.NotificationQuestion) {
                    // If ID found, break no further action required.
                    if (newQuestion.ID == oldQuestion.ID) {
                        // If ID found, break, no further action required.
                        idFound = true;
                        break;
                    }
                }

                // Find and remove old job that is not in the new version.
                if (!idFound) {
                    for (int i = 0; i < _timingJobs.Count; i++) {
                        if (_timingJobs[i].ID == oldQuestion.ID) {
                            _timingJobs.RemoveAt(i);
                            i = _timingJobs.Count;
                        }
                    }
                }
            }

            foreach (NotificationQuestionModel newQuestion in model.NotificationQuestion) {
                bool idFound = false;
                foreach (SchedulingJobDetails oldQuestion in _timingJobs) {
                    // If ID found, break no further action required.
                    if (newQuestion.ID == oldQuestion.ID) {
                        idFound = true;
                        break;
                    }
                }
                // Add new unique question to job list. 
                if (!idFound) {
                    _timingJobs.Add(new SchedulingJobDetails {
                        question = newQuestion,
                        cronExpression = CronExpression.Parse(newQuestion.Frequency)
                    });
                }
            }
        }

        private async Task<bool> _UpdatesAvailable() {
            int newVersion;
            try {
                newVersion = (await _QueryServer<QueryResponseMe>(QueryTemplates.getVersion)).Me.Notification.Version;
            } catch (WebException e) {
                // Assume that if no response returned from server, nothing has changed. 
                return false;
            }
            return (newVersion == _currentVersion) ? false : true;
        }

        private async Task<NotificationModel> _RetrieveUpdates() {
            NotificationModel model;
            try {
                model = (await _QueryServer<QueryResponseMe>(QueryTemplates.getAll)).Me.Notification;
            } catch (WebException e) {
                // If no response from server, pass error to parent.
                throw e;
            }
            return model;
        }

        private async Task<T> _QueryServer<T>(string Query) {
            GraphQLHttpClient graphQLClient = new GraphQLHttpClient("http://hackathon-lb-69098931.ap-southeast-2.elb.amazonaws.com/graphql", new NewtonsoftJsonSerializer());
            GraphQLRequest request = new GraphQLRequest {
                Query = Query
            };
            var response = await graphQLClient.SendQueryAsync<T>(request);
            if (response.Data == null) throw new WebException("Server Returned No Results");
            return response.Data;
        }

        private async Task _ManageUpdates() {
            bool updateIsAvailable = await _UpdatesAvailable();
            if (updateIsAvailable) {
                NotificationModel model;
                try {
                    // May throw
                    model = await _RetrieveUpdates();
                    // Should only be performed if above doesn't throw
                    _RegisterNotificationModel(model);
                } catch (WebException e) {
                    // Assume that there are no questions if questions cannot be retrieved on known update. 
                    _timingJobs.Clear();
                }
            }
        }

        private async Task<bool> _JobShouldInvoke(SchedulingJobDetails job) {
            await _ManageUpdates();
            foreach (SchedulingJobDetails activeJob in _timingJobs) {
                if (activeJob.ID == job.ID) return true;
            }
            return false;
        }

        private async Task _RunSchedulingLoop(CancellationToken cancellationToken) {
            await _ManageUpdates();
            do {
                TimeSpan minimumTime = TimeSpan.MaxValue;
                SchedulingJobDetails? jobToRun = null;
                foreach (SchedulingJobDetails job in _timingJobs) {
                    var nextOccurence = job.cronExpression.GetNextOccurrence(DateTime.Now);
                    if (nextOccurence != null) {
                        var timeUntilNextOccurrence = (nextOccurence - DateTime.Now).Value;
                        if (timeUntilNextOccurrence < minimumTime) {
                            minimumTime = timeUntilNextOccurrence;
                            jobToRun = job;
                        }
                    }
                }
                if (jobToRun != null && minimumTime < TimeSpan.MaxValue) {
                    await Task.Delay(minimumTime, cancellationToken);
                }
            } while (!cancellationToken.IsCancellationRequested);
        }

        public Task StartAsync(CancellationToken cancellationToken) {
            // Store the task we're executing
            _executingTask = _RunSchedulingLoop(cancellationToken);

            // If the task is completed then return it,
            // this will bubble cancellation and failure to the caller
            if (_executingTask.IsCompleted) {
                return _executingTask;
            }

            // Otherwise it's running
            return Task.CompletedTask;
        }

        public async Task StopAsync(CancellationToken cancellationToken) {
            // Wait until the task completes or the stop token triggers
            await Task.WhenAny(_executingTask, Task.Delay(Timeout.Infinite, cancellationToken));
        }

        public void Dispose() {

        }
    }

    internal class SchedulingJobDetails {
        public NotificationQuestionModel question;
        public CronExpression cronExpression;
        public string ID {
            get {
                return question.ID;
            }
        }
    }
}
