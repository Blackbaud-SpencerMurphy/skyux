/*global angular, alert*/
//A comment

(function () {
    'use strict';

    function RunTemplateCache($templateCache) {
        $templateCache.put('bbGrid/samples/date.html', '<div>{{data | date: \'medium\'}}</div>');

        $templateCache.put('bbGrid/samples/gridtooltip.html',
                          '<div style="height: 70px; width: 300px;"><a>On your face</a></div>');
    }

    function TemplateController($scope) {
        var self = this;

        self.clickIt = function () {
            alert('Column button clicked, id: ' + $scope.rowData.id);
        };
    }

    function GridTestController($scope, $filter, $timeout) {

        var dataSetBand = [
                {
                    name: 'John bbbbbbbbkasdfkjhsadlkfj\nhsadlkjfhkljsabckhabsdflkhbaslkhbvosahdgfoiyewr\niufhsakhfbkjahxbvlhdafgiuyasgdfuhbkcvbuihasgdfiugfknbzxfgkjhbzxckjhvbdifghviusfgkjhgdsfkjhsdbfvjhbxkjchvbkjhdsgfuhgsdvkjhbdskjfhbkdsfgvkjhsdbv\nkjhabdfskuhasvfkjghbvxkvbskdjhfbkjhasdgkjhbsakfjhaskjfghiuya\nsdgfjhsdbfvjkhbsadfksaiudyrgjkshadfgkjhsavkjhvasdkjfhgaskygfahbsefkhbsfuyvkjashgrfsjkhbfkjhsavfkjhga\nsdkjgrwuiyerfsdjhbfjkhsagruygsfjkhvbasdfkhjgaksjhdfguyasgdfjkhbvsdjhfbjh',
                    instrument: 'Rhythm guitar',
                    bio: '',
                    templated: {
                        title: 'Johnny',
                        info: 'JInfo'
                    },
                    mydate: Date.parse('1/21/2015')
                },
                {
                    name: 'Paul',
                    instrument: 'Bass',
                    bio: '',
                    templated: {
                        title: 'Paully',
                        info: 'PInfo'
                    },
                    mydate: Date.parse('2/23/2012')
                },
                {
                    name: 'George',
                    instrument: 'Lead guitar',
                    bio: '',
                    templated: {
                        title: 'Georgy',
                        info: 'GInfo'
                    },
                    mydate: Date.parse('4/14/1999')
                },
                {
                    name: 'Ringo',
                    instrument: 'Drums',
                    bio: '',
                    templated: {
                        title: 'Ringoy',
                        info: 'RInfo'
                    },
                    mydate: Date.parse('6/22/1989')
                }
            ],
            self = this;


        self.clickCustom = function () {
            alert('custom button clicked');
        };


        $timeout(function () {
            self.gridOptions = {
                columns: [
                    {
                        caption: 'Name',
                        jsonmap: 'name',
                        id: 1,
                        name: 'name',
                        right_align: true,
                        category: 'My category',
                        description: 'Column description',
                        width_all: 300,
                        width_xs: 100
                    },
                    {
                        caption: 'Instrument',
                        jsonmap: 'instrument',
                        id: 2,
                        name: 'instrument',
                        width_all: 300,
                        width_xs: 100
                    },
                    {
                        caption: 'Biography',
                        jsonmap: 'bio',
                        id: 3,
                        name: 'bio',
                        allow_see_more: true,
                        center_align: true,
                        width_all: 400,
                        width_xs: 100
                    },
                    {
                        caption: 'Date',
                        jsonmap: 'mydate',
                        id: 5,
                        name: 'mydate',
                        width_all: 200,
                        template_url: 'bbGrid/samples/date.html'
                    }
                ],
                multiselect: true,
                data: dataSetBand,
                getContextMenuItems: function (rowid, rowObject) {
                    if (rowid === 'blaarrrh' || rowObject.name === 'Ringo') {
                        return [
                            {
                                id: 'menu',
                                title: 'Option1',
                                cmd: function () {
                                    alert('Context menu option chosen!');
                                    return false;
                                }
                            }
                        ];
                    }
                },
                sortOptions: {
                    excludedColumns: ['bio']
                },
                selectedColumnIds: [1, 2, 3, 5],
                columnPickerHelpKey: 'bb-security-users.html',
                columnPickerMode: 'list'
            };


            $scope.$watch(function () {
                return self.gridOptions.sortOptions;
            }, function () {
                self.gridOptions.data.sort(function (a, b) {
                    var descending = self.gridOptions.sortOptions.descending ? 1 : -1,
                        sortProperty = self.gridOptions.sortOptions.column;
                    if (a[sortProperty] > b[sortProperty]) {
                        return (descending);
                    } else if (a[sortProperty] < b[sortProperty]) {
                        return (-1 * descending);
                    } else {
                        return 0;
                    }
                });
            }, true);


            self.gridOptions.hasMoreRows = true;
            self.data = dataSetBand;

            $scope.$on('loadMoreRows', function () {

                self.gridOptions.loading = true;
                $timeout(function () {
                    var newData = self.data.concat(dataSetBand);
                    self.data = newData;
                    self.gridOptions.data = newData;
                    self.gridOptions.loading = false;
                }, 2000);

            });

        });


    }


    RunTemplateCache.$inject = ['$templateCache'];

    TemplateController.$inject = ['$scope'];

    GridTestController.$inject = ['$scope', '$filter', '$timeout'];

    angular.module('stache')
    .run(RunTemplateCache)
    .controller('TemplateController', TemplateController)
    .controller('GridTestController', GridTestController);

}());
