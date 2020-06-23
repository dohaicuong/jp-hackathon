using System;
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

        private void workerThreadMain(object state) {
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


        public async void ScheduleAction(Action action, DateTime executionTime) {
            Current.MainWindow.Show();
            // Wait for 
            await Task.Delay((int)executionTime.Subtract(DateTime.Now).TotalMilliseconds);
            action();
        }
    }
}
