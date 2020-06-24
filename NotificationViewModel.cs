using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Text;
using System.Windows;
using System.Windows.Input;

namespace EmployeeCentre {
    class NotificationViewModel : INotifyPropertyChanged {

        private NotificationModel notificationModel = new NotificationModel();

        public CheckBoxModel CheckBoxModel {
            get {
                return notificationModel.Checkbox;
            }
        }

        public ICommand showWindowCommand { 
            get {
                return new DelegateCommand {
                    CanExecuteFunc = () => {
                        return (Application.Current.MainWindow == null || Application.Current.MainWindow.IsVisible == false);
                    },

                    CommandAction = () => {
                        Application.Current.MainWindow = new MainWindow();
                        Application.Current.MainWindow.Show();
                    },
                };
            } 
        }

        public ICommand hideWindowCommand {
            get {
                return new DelegateCommand {
                    CanExecuteFunc = () => {
                        return (Application.Current.MainWindow != null && Application.Current.MainWindow.IsVisible);
                    },

                    CommandAction = () => {
                        Application.Current.MainWindow = new MainWindow();
                        Application.Current.MainWindow.Show();
                    },
                };
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void onPropertyChangeEventHandler(string propertyName) {
            if (PropertyChanged != null) {
                PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }
    }

    class DelegateCommand : ICommand {
        public Action CommandAction { get; set; }
        public Func<bool> CanExecuteFunc { get; set; }

        public event EventHandler CanExecuteChanged {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }

        public bool CanExecute(object parameter) {
            return CanExecuteFunc();
        }

        public void Execute(object parameter) {
            CommandAction();
        }
    }
}
