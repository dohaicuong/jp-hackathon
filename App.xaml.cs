using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
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
        }
    }
}
