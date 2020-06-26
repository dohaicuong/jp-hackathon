using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;

namespace EmployeeCentre {
    class DataModel {
        public string TextBody {
            get {
                return "This is the string from the model";
            }
        }

        public List<ButtonModel> Buttons {
            get {
                return new List<ButtonModel> {
                    new ButtonModel {Image = "images/Cry.ico", IsRadio=true, ID=0},
                    new ButtonModel {Image = "images/Frustrated.ico", IsRadio=true, ID=1},
                    new ButtonModel {Image = "images/Unsure.ico", IsRadio=true, ID=2},
                    new ButtonModel {Image = "images/Happy.ico", IsRadio=true, ID=3},
                };
            }
        }

        public CheckBoxModel Checkbox {
            get {
                return new CheckBoxModel();
            }
        }
    }

    class CheckBoxModel {
        public bool Exists { get; set; }
        public string Text { 
            get {
                if (Exists) {
                    return text;
                } else {
                    return "";
                }
            } 
            set {
                text = value;
            }
        }

        private string text;
    }

    class ButtonModel {
        public string Image { get; set; }
        public bool IsRadio { get; set; }
        public int ID { get; set; }
    }
}
