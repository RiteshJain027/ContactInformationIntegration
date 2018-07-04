var app = angular.module('BlurAdmin')

app.directive('taskpanel', function () {
    var tpd = {};

    tpd.restrict = 'E';

    tpd.replace = false;

    tpd.template = '<div class="row container-fluid" ng-init="init()">' +
                        '<div class="taskpanel">' +
                            '<label class="input-sm taskpanel-caption">{{caption}}</label> <br />' +
                            '<label class="taskpanel-lbl">{{hours}}:{{minutes}}:{{seconds}}</label>' +
                            '<button class="btn btn-sm taskpanel-btn" style="width:40px; " ng-click="startPauseResume()">' +
                                '<span style="font-size: 14px;" ng-class="{ \' glyphicon glyphicon-pause btnBlueClr \': isRunning , \' glyphicon glyphicon-play btnGreenClr \' : !isRunning }"></span>' +
                            '</button>' +
                            '<button class="btn btn-sm taskpanel-btn" style="color:darkred; width:40px" ng-disabled="!isRunning" ng-click="stop()">' +
                                '<span style="font-size: 14px;" class="glyphicon glyphicon-stop"></span>' +
                             '</button>' +
                        '</div>' +
                    '</div>';

    tpd.scope = {
        onPause: '&',
        onStop: '&',
        seconds: '=?',
        minutes: '=?',
        hours: '=?',
        startTimeAttr: '=startTime',
        endTimeAttr: '=endTime',
        interval: '=interval',
        autoStart: '&autoStart',
        burntHours: '=burntHours',
        caption: '@caption'
    }

    tpd.controller = ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
        $scope.startTime = null;
        $scope.isStarted = false;
        $scope.endTime = null;
        $scope.timeoutId = null;
        $scope.isRunning = false;

        function resetTimeout() {
            if ($scope.timeoutId) {
                clearTimeout($scope.timeoutId);
            }
        }

        $scope.init = function () {
            if ($attrs.burntHours !== undefined && $scope.burntHours != '' && parseFloat($scope.burntHours, 10) > 0) {
                setStartTime();
            }

            $scope.autoStart = $attrs.autoStart || $attrs.autostart;
            if ($scope.autoStart !== undefined && $scope.autoStart == "true") {
                $scope.start();
            }

            if ($scope.startTime == null) {
                $scope.hours = 0;
                $scope.minutes = 0;
                $scope.seconds = 0;

                addLeadingZero();
            }
            else {
                calculateTimeUnits();
            }
        }

        $scope.startPauseResume = function () {
            if ($scope.isRunning) {
                $scope.pause();
            }
            else {
                if ($scope.isStarted) {
                    $scope.resume();
                }
                else {
                    $scope.start();
                    $scope.isStarted = true;
                }
            }
        };

        $scope.start = function () {
            $scope.startTime = $scope.startTimeAttr || $scope.startTimeAttr != '' ? moment($scope.startTimeAttr) : moment();
            $scope.endTime = $scope.endTimeAttr ? moment($scope.endTimeAttr) : null;
            resetTimeout();
            tick();
            $scope.isRunning = true;
        };

        $scope.resume = function () {
            resetTimeout();
            $scope.startTime = moment().diff((moment($scope.stoppedTime).diff(moment($scope.startTime))));
            tick();
            $scope.isRunning = true;
        };

        $scope.pause = function () {
            var timeoutId = $scope.timeoutId;
            $scope.clear();
            $scope.$emit('timer-paused', { timeoutId: timeoutId, millis: $scope.millis, seconds: $scope.seconds, minutes: $scope.minutes, hours: $scope.hours, days: $scope.days });

            if ($attrs.onPause !== undefined) {
                $scope.$eval($scope.onPause);
            }
        };

        $scope.stop = function () {
            var timeoutId = $scope.timeoutId;
            $scope.clear();
            $scope.$emit('timer-stopped', { timeoutId: timeoutId, millis: $scope.millis, seconds: $scope.seconds, minutes: $scope.minutes, hours: $scope.hours, days: $scope.days });

            if ($attrs.onStop !== undefined) {
                $scope.$eval($scope.onStop);
            }
        };

        $scope.clear = function () {
            // same as stop but without the event being triggered
            $scope.stoppedTime = moment();
            resetTimeout();
            $scope.timeoutId = null;
            $scope.isRunning = false;
        };

        var setStartTime = function () {
            var d = new Date();
            var mins = $scope.burntHours * 60;
            d.setMinutes(d.getMinutes() - mins);
            $scope.startTimeAttr = d;
        }

        var tick = function tick() {
            var typeTimer = null; // countdown or endTimeAttr
            $scope.millis = moment().diff($scope.startTime);
            var adjustment = $scope.millis % 1000;

            if ($scope.endTimeAttr) {
                typeTimer = $scope.endTimeAttr;
                $scope.millis = moment($scope.endTime).diff(moment());
                adjustment = $scope.interval - $scope.millis % 1000;
            }

            if ($scope.millis < 0) {
                $scope.stop();
                $scope.millis = 0;
                calculateTimeUnits();
                if ($scope.finishCallback) {
                    $scope.$eval($scope.finishCallback);
                }
                return;
            }
            calculateTimeUnits();

            //We are not using $timeout for a reason. Please read here - https://github.com/siddii/angular-timer/pull/5
            $scope.timeoutId = setTimeout(function () {
                tick();
                $scope.$digest();
            }, $scope.interval - adjustment);

            $scope.$emit('timer-tick', { timeoutId: $scope.timeoutId, millis: $scope.millis, timerElement: $element[0] });
        };

        $scope.$on('tag-added', $scope.onPause);

        function calculateTimeUnits() {
            //if ($scope.startTime !== undefined) {
            //    $scope.millis = moment().diff(moment($scope.startTimeAttr));
            //}

            // compute time values based on maxTimeUnit specification
            if (!$scope.maxTimeUnit || $scope.maxTimeUnit === 'day') {
                $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            } else if ($scope.maxTimeUnit === 'hour') {
                $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
                $scope.hours = Math.floor($scope.millis / 3600000);
                $scope.days = 0;
                $scope.months = 0;
                $scope.years = 0;
            } else if ($scope.maxTimeUnit === 'second') {
                $scope.seconds = Math.floor($scope.millis / 1000);
                $scope.minutes = 0;
                $scope.hours = 0;
            } else if ($scope.maxTimeUnit === 'minute') {
                $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
                $scope.minutes = Math.floor($scope.millis / 60000);
                $scope.hours = 0;
            }

            addLeadingZero();
        }

        function addLeadingZero() {
            //add leading zero if number is smaller than 10
            $scope.seconds = $scope.seconds < 10 ? '0' + $scope.seconds : $scope.seconds;
            $scope.minutes = $scope.minutes < 10 ? '0' + $scope.minutes : $scope.minutes;
            $scope.hhours = $scope.hours < 10 ? '0' + $scope.hours : $scope.hours;
        }
    }]

    tpd.compile = function (element, attributes) {
    }

    return tpd;
});