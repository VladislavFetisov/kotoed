import pathToRegexp = require("path-to-regexp");

export namespace Kotoed {

    export const Address = {
        Api: {

            create: (entity: String) => {
                `kotoed.api.${entity}.create`
            },
            read: (entity: String) => {
                `kotoed.api.${entity}.read`
            },

            Course: {
                Create: "kotoed.api.course.create",
                Read: "kotoed.api.course.read",
                Error: "kotoed.api.course.error",
                Search: "kotoed.api.course.search",
                SearchCount: "kotoed.api.course.search.count",

                Verification: {
                    Data: "kotoed.api.course.verification.data"
                }
            },

            Project: {
                Create: "kotoed.api.project.create",
                Read: "kotoed.api.project.read",
                Error: "kotoed.api.project.error",
                Search: "kotoed.api.project.search",
                SearchCount: "kotoed.api.project.search.count",
                SearchForCourse: "kotoed.api.project.searchForCourse",
                SearchForCourseCount: "kotoed.api.project.searchForCourse.count",

                Verification: {
                    Data: "kotoed.api.project.verification.data"
                }
            },

            Submission: {
                Read: "kotoed.api.submission.read",
                Last: "kotoed.api.submission.last",
                Create: "kotoed.api.submission.create",
                Comments: "kotoed.api.submission.comments",
                CommentAggregates: "kotoed.api.submission.commentAggregates",
                Error: "kotoed.api.submission.error",
                List: "kotoed.api.submission.list",
                ListCount: "kotoed.api.submission.list.count",
                Verification: {
                    Data: "kotoed.api.submission.verification.data"
                },

                Comment: {
                    Read: "kotoed.api.submission.comment.read",
                    Update: "kotoed.api.submission.comment.update",
                    Create: "kotoed.api.submission.comment.create",
                    Search: "kotoed.api.submission.comment.search",
                    SearchCount: "kotoed.api.submission.comment.search.count"
                },

                Code: {
                    Download: "kotoed.api.submission.code.download",
                    Read: "kotoed.api.submission.code.read",
                    List: "kotoed.api.submission.code.list"
                },

                Result: {
                    Read: "kotoed.api.submission.result.read"
                }
            },

            Denizen: {
                Create: "kotoed.api.denizen.create",
                Read: "kotoed.api.denizen.read"
            },

            Notification: {
                Create: "kotoed.api.notification.create",
                Current: "kotoed.api.notification.current",
                RenderCurrent: "kotoed.api.notification.current.render",
                MarkRead: "kotoed.api.notification.markRead"
            },
            OAuthProvider: {
                List: "kotoed.api.oAuthProvider.list"

            }
        }
    };

    export const UrlPattern = {
        Index: "/",

        Star: "/*",

        NotImplemented: "/notImplemented",

        CodeReview: {
            Index: "/codereview/:id/*"
        },

        Auth: {
            Index: "/login",
            DoLogin: "/login/doLogin",
            DoSignUp: "/login/doSignUp",
            LoginDone: "/login/done",
            Logout: "/logout",
            OAuthStart: "/login/oauth/start/:providerName",
            OAuthCallback: "/login/oauth/callback/:providerName"
        },

        AuthHelpers: {
            WhoAmI: "/whoAmI",
            RootPerms: "/perms/root",
            CoursePerms: "/perms/course/:id",
            ProjectPerms: "/perms/project/:id",
            SubmissionPerms: "/perms/submission/:id"
        },
        Course: {
            Index: "/course/:id"
        },

        Project: {
            Index: "/project/:id"
        },

        Submission: {
            Results: "/views/submission/:id/results"
        },



        EventBus: "/eventbus/*",
        Static: "/static/*",

        reverse(pattern: string, params: { [name: string]: string | number }, star: string | number = ""): string {
            let url = pattern;
            for (let k in params) {
                url = url.replace(`:${k}`, `${params[k]}`)
            }

            url = url.replace("*", `${star}`);

            return url
        },

        tryResolve(pattern: string, url: string): Map<string | number, string> | undefined {
            let keys: Array<pathToRegexp.Key> = [];
            let re = pathToRegexp(pattern, keys);
            let match = re.exec(url);

            if (match === null)
                return undefined;

            let res = new Map<string | number, string>();

            for (let i = 1; i < match.length; i++) {
                let keyIx = i - 1;
                res.set(keys[keyIx].name, match[i])
            }

            return res;
        }
    };

}
