angular.module('BmsApp')
.directive('statusSelect', function () {
    return {
        template: `
            <ui-select ng-model="status_code" required
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
})

.directive('stateSelect', function () {
    return {
        template: `
            <ui-select ng-model="state_id" required
                    theme="bootstrap">

            <ui-select-match placeholder="State">
                <span>{{$select.selected.name}}</span>
            </ui-select-match>

            <ui-select-choices
                    repeat="item as item in (states | filter: $select.search) track by item.id"
            >
                <span>{{item.name}}</span>
            </ui-select-choices>
        </ui-select>
        `,
        scope: { states: '=' }
    };
})