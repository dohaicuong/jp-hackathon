using System;
using System.Collections.Generic;

namespace EmployeeCentre {
    class QueryMe {
        public UserModel User { get; set; }
    }

    class UserModel {
        public string ID { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public BranchModel Branch { get; set; }
    }

    class UserTaskModel {
        public string ID { get; set; }
        public int Version { get; set; }
        public NotificationTaskModel Tasks { get; set; }
    }

    class NotificationTaskModel {
        public string ID { get; set; }
        public QuestionModel Question { get; set; }
        public FrequencyModel Frequency { get; set; }
    }

    class QuestionModel {
        public string ID { get; set; }
        public string Question { get; set; }
        public QuestionOptionModel Options { get; set; }
        public bool IsMultiple { get; set; }
        public bool isOptionalResponse { get; set; }
    }

    class QuestionOptionModel {
        public string ID { get; set; }
        public string Label { get; set; }
        public string Logo { get; set; }
    }

    class FrequencyModel {
        public string ID { get; set; }
        public string Frequency { get; set; }
    }

    class BranchModel {
        public string ID { get; set; }
        public string Name { get; set; }
    }
}
