using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Linq;
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

        Task backgroundWorker;
        DispatcherTimer timer = new System.Windows.Threading.DispatcherTimer();

        protected override void OnStartup(StartupEventArgs e) {
            base.OnStartup(e);

            var icon = FindResource("notifyIcon");

            notifyIcon = (TaskbarIcon)FindResource("notifyIcon");

            backgroundWorker = workLoop();
        }

        private async Task workLoop() {
            while (true) {
                timer.Interval = new TimeSpan(0, 0, 5);
                timer.Tick += new EventHandler(async (object sender, System.EventArgs e) => {
                    this.Dispatcher.Invoke(() => {
                        if (Current.MainWindow == null) {
                            Current.MainWindow = new MainWindow();
                            Current.MainWindow.Show();
                        } else {
                            Current.MainWindow.Show();
                        }
                    });
                });
                timer.Start();
            }   
        }

        public async void ScheduleAction(Action action, DateTime executionTime) {
            Current.MainWindow.Show();
            // Wait for 
            await Task.Delay((int)executionTime.Subtract(DateTime.Now).TotalMilliseconds);
            action();
        }
    }
}
