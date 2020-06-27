using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Text;
using System.Windows;
using System.Windows.Input;

namespace EmployeeCentre {
    public class NotificationViewModel : INotifyPropertyChanged {

        private readonly UserModel _dataModel;

        public NotificationViewModel() {

        }

        public NotificationViewModel(UserModel model) {
            _dataModel = model;
        }

        public string TextBody { 
            get {
                return _dataModel.Notification.NotificationQuestion[0].Question.Question ?? "An error has occurred, question is empty";
            } 
        }

        public List<ButtonViewModel> Buttons { 
            get {
                var buttons = new List<ButtonViewModel>();
                foreach (QuestionOptionModel option in _dataModel.Notification.NotificationQuestion[0].Question.Options) {
                    buttons.Add(new ButtonViewModel(option));
                }
                return buttons;
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

    public class ButtonViewModel {
        private readonly QuestionOptionModel _options;
        public ButtonViewModel(QuestionOptionModel options) {
            _options = options;
        }

        public string Image {
            get {
                // return _options.Logo ?? NullImage;
                return "images/Asleep.ico" ?? NullImage;
            }
        }

        public string NullImage {
            get {
                return "images/image-unavailable.png";
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
