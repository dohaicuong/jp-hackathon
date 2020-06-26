using System;
using System.Collections.Generic;

namespace EmployeeCentre {
    class QueryResponseMe {
        public UserModel Me { get; set; }
    }

    public class UserModel {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public BranchModel Branch { get; set; }
        public NotificationModel Notification { get; set; }
    }

    public class NotificationModel {
        public string ID { get; set; }
        public int Version { get; set; }
        public List<NotificationQuestionModel> NotificationQuestion { get; set; }
    }

    public class NotificationQuestionModel {
        public string ID { get; set; }
        public QuestionModel Question { get; set; }
        public string Frequency { get; set; }
    }

    public class QuestionModel {
        public string ID { get; set; }
        public string Question { get; set; }
        public List<QuestionOptionModel> Options { get; set; }
        public bool IsMultiple { get; set; }
        public bool isOptionalResponse { get; set; }
    }

    public class QuestionOptionModel {
        public string ID { get; set; }
        public string Label { get; set; }
        public string Logo { get; set; }
    }

    public class BranchModel {
        public string ID { get; set; }
        public string Name { get; set; }
    }
}
