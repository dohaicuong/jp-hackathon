﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Threading;
using Hardcodet.Wpf.TaskbarNotification;
using GraphQL.Client;
using GraphQL;
using GraphQL.Client.Abstractions;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;

namespace EmployeeCentre {
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application {

        private TaskbarIcon notifyIcon;

        protected override void OnStartup(StartupEventArgs e) {
            base.OnStartup(e);

            var icon = FindResource("notifyIcon");
            notifyIcon = (TaskbarIcon)FindResource("notifyIcon");

            CancellationTokenSource cts = new CancellationTokenSource();
            ThreadPool.QueueUserWorkItem(workerThreadMain, cts.Token);
        }

        private async void workerThreadMain(object state) {
            GraphQLHttpClient graphQLClient = new GraphQLHttpClient("http://hackathon-lb-69098931.ap-southeast-2.elb.amazonaws.com/graphql", new NewtonsoftJsonSerializer());
            GraphQLRequest request = new GraphQLRequest {
                Query = @" {
                    tasks {
                        id
                        questions {
                            question
                        }
                        users {
                            name
                            role
                        }
                    }   
                }"
            };

            var response = await graphQLClient.SendQueryAsync<ResponseType>(request);
            CancellationToken token = (CancellationToken)state;
            Timer timer = new Timer(timerCallback, null, 0, 5000);
            while (true) {
                Thread.Sleep(1000);
                if (token.IsCancellationRequested) {
                    break;
                }
            }
        }

        private void timerCallback(object state) {
            Dispatcher.Invoke(() => {
                if (Current.MainWindow == null) {
                    Current.MainWindow = new MainWindow();
                    Current.MainWindow.Show();
                } else {
                    Current.MainWindow.Show();
                }
            });
        }
    }
}