using System;
using System.Collections.Generic;
using System.Text;

namespace EmployeeCentre {
    static class QueryTemplates {
        public static string getAll = @"{
            me {
                id
                name
                role
                branch {
                    id
                    name
                }
                notification {
                    id
                    version
                    notificationQuestion {
                        id
                        question {
                            id
                            question
                            options {
                                id
                                label
                                logo
                            }
                            isMultiple
                            isOptionalResponse
                        }
                        frequency
                    }
                }
            }
        }";

        public static string getUserTaskVersion = @"{
            me {
                notification {
                    version
                }
            }
        }";
    }
}
