/**
 * INSPINIA - Responsive Admin Theme
 *
 */
'use strict';

(function () {
    angular.module('openvillage', [
            'ui.router',        // Routing
            'ui.bootstrap',     // Bootstrap
            'ui.router.login',   // Login module
            'oitozero.ngSweetAlert', //ngSweetAlert
            'datatables',
            'ui.sortable',
            'ui.codemirror'
        ]);

    var messages = {
        errors: {
            BUILD_LIST_CREATION: {title: 'Error occurred', type: 'error', text: 'Error when builds list was created'},
            GET_BUILD_DETAILS: {title: 'Error occurred', type: 'error', text: 'Cannot get build details'},
            BUILD_WAS_NOT_RUNNING: {title: 'Error occurred', type: 'error', text: 'Build was not running'},
            ZIP_PACKAGE_CREATION: {title: 'Error occurred', type: 'error', text: 'Error during creation zip package'},
            SAVING_CHANGES_FAILED: {title: 'Error occurred', type: 'error', text: 'Error while trying to save changes'},
            GET_BRANCHES: {title: 'Error occurred', type: 'error', text: 'Error in getting branches. Check your credentials and repository address'},
            GET_SCRIPTS: {title: 'Error occurred', type: 'error', text: 'Cannot get scripts for project'},
            DELETION_SCRIPT: {title: 'Error occurred', type: 'error', text: 'Error during deletion script'},
            ADDING_NEW_SCRIPT_FAILED: {title: 'Error occurred', type: 'error', text: 'Problem with adding new script'},
            GET_SCRIPT_DATA_FAILED: {title: 'Error occurred', type: 'error', text: 'Problem with loading script data'},
            CRON_NOT_SET_CORRECTLY: {title: 'Error occurred', type: 'error', text: 'Cron was not set correctly'},
            GET_CRON_JOB_FAILED: {title: 'Error occurred', type: 'error', text: 'Getting cron jobs not succeeded'},
            DELETION_JOB_FAILED: {title: 'Error occurred', type: 'error', text: 'Deletion of cron job failed'},
            GET_PROJECT_DETAILS: {title: 'Error occurred', type: 'error', text: 'Cannot get project details'},
            GET_PROJECT_DETAILS_WITH_BRANCHES: {title: 'Error occurred', type: 'error', text: 'Cannot get project details with branches info'},
            PROJECT_SAVING_FAILED: {title: 'Error occurred', type: 'error', text: 'Error while trying to save project'},
            GET_PROJECTS_FAILED: {title: 'Error occurred', type: 'error', text: 'Cannot get projects list'},
            DELETION_PROJECT_FAILED: {title: 'Error occurred', type: 'error', text: 'Error during deletion of project'},
            SENDING_REPORT_FAILED: {title: 'Error occurred', type: 'error', text: 'Error while trying to send report'},
            CANNOT_CREATE_USER: {title: 'Error occurred', type: 'error', text: 'Cannot create a user. Check the fields in the registration form'},
            EMPTY_CODE: {title: 'Error occurred', type: 'error', text: 'Code cannot be empty'},
            LOGIN_FAILED: {title: 'Error occurred', type: 'error', text: 'Username or password is incorrect'}
        },
        info: {
            GET_BRANCHES: {title: 'Error in getting branches', type: 'info', text: 'Check your credentials and repository address'}
        },
        success: {
            DELETION_SCRIPT: {title: 'Deleted!', type: 'success', text: 'Your script has been deleted'},
            DELETION_PROJECT: {title: 'Deleted!', type: 'success', text: 'Your project has been deleted'},
            CRON_BUILD_SAVED: {title: 'Cron build saved!', type: 'success', text: 'Cron saved successfully'},
            CRON_JOB_DELETED: {title: 'Deleted!', type: 'success', text: 'Cron job has been deleted'},
            STEP_ADDED: {title: 'Added!', type: 'success', text: 'Step has been added to queue'},
            STEP_DELETED: {title: 'Deleted!', type: 'success', text: 'Step has been deleted'}
        }
    };

    angular.module('openvillage')
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
    })
        .constant('messages', messages);


})();