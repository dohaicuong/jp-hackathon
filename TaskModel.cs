using System;
using System.Collections.Generic;

namespace EmployeeCentre {

    class ResponseType {
        public List<TaskModel> Tasks { get; set; }
    }

    class TaskModel {
        public string Id { get; set; }
        public List<QuestionsModel> Questions { get; set; }
        public List<UsersModel> Users { get; set; }
    }

    class QuestionsModel {
        public string question;
    }

    class UsersModel {
        public string name;
        public string role;
    }
}
