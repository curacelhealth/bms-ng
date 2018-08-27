angular.module('BmsApp').directive('statusSelect', function () {
    return {
        template: `
            <ui-select ng-model="state_id" ng-model="status_code" required
                    theme="bootstrap">

            <ui-select-match placeholder="Status">
                <span>{{$select.selected.name}}</span>
            </ui-select-match>

            <ui-select-choices
                    repeat="item as item in (statuses | filter: $select.search) track by item.id"
            >
                <span> {{item.name}} ({{item.code}})</span>
            </ui-select-choices>
        </ui-select>
        `,
        scope: { statuses: '=' }
    };
});