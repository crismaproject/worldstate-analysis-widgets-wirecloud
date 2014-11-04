angular.module(
    'de.cismet.crisma.widgets.worldstateAnalysisWidgetsWirecloud',
    [
        'eu.crismaproject.worldstateAnalysis.demoApp'
    ]
).controller(
    'de.cismet.crisma.widgets.worldstateAnalysisWidgetsWirecloud.wire',
    [
        '$scope',
        '$controller',
        '$timeout',
        '$q',
        'de.cismet.collidingNameService.Nodes',
        'de.cismet.crisma.ICMM.Worldstates',
        'localStorageService',
        'DEBUG',
        function (
            $scope,
            $controller,
            $timeout,
            $q,
            Nodes,
            Worldstates,
            localStorageService,
            DEBUG
        ) {
            'use strict';

            var mashupPlatform, setSelectedWsWirecloud;

            if (typeof MashupPlatform === 'undefined') {
                if (DEBUG) {
                    console.log('mashup platform not available');
                }
            } else {
                // enable minification
                mashupPlatform = MashupPlatform;

                // simply inherit the demo controller
                $controller(
                    'eu.crismaproject.worldstateAnalysis.demoApp.controllers.MainController',
                    {
                        $scope: $scope,
                        Nodes: Nodes,
                        Worldstates: Worldstates,
                        localStorageService: localStorageService,
                        $timeout: $timeout
                    }
                );

                setSelectedWsWirecloud = function (newSelWsStringArray) {
                    var i, resolve, setArray, selWsStringArray;

                    if (DEBUG) {
                        console.log('BEGIN: receiving selected worldstates event: ' + newSelWsStringArray);
                    }

                    setArray = function (arr) {
                        var
                            // needed for array comparison: i, wsId, wsNode, ws, objectKey, isContained,
                            // used if no indicator vector is set
                            group, iccObject, indicatorGroup, indicatorProp;

                        if (DEBUG) {
                            console.log('DO: receiving selected worldstates event: ' + arr);
                        }

                        if (arr.length > 0) {
                            if ($scope.indicatorVector.length === 0) {
                                iccObject = Worldstates.utils.stripIccData([arr[0]], false)[0];
                                for (indicatorGroup in iccObject.data) {
                                    if (iccObject.data.hasOwnProperty(indicatorGroup)) {
                                        group = iccObject.data[indicatorGroup];
                                        for (indicatorProp in group) {
                                            if (group.hasOwnProperty(indicatorProp)) {
                                                if (indicatorProp !== 'displayName' && indicatorProp !== 'iconResource') {
                                                    $scope.indicatorVector.push(group[indicatorProp]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            $scope.worldstates = arr;

                            // we may want to find out the changes in the selection and alter the existing array for
                            // performance reasons
//                            if ($scope.treeSelection.length > $scope.worldstates.length) {
//                                //we need to find the new element in the treeSelection array.
//                                for (i = $scope.treeSelection.length - 1; i >= 0; i++) {
//                                    wsNode = $scope.treeSelection[i];
//                                    isContained = false;
//                                    /*jshint -W083 */
//                                    $scope.worldstates.forEach(function (val) {
//                                        objectKey = wsNode.objectKey;
//                                        wsId = parseInt(objectKey.substring(objectKey.lastIndexOf('/') + 1, objectKey.length));
//                                        if (parseInt(val.id) === wsId) {
//                                            isContained = true;
//                                        }
//                                    });
//                                    if (!isContained) {
//                                        objectKey = wsNode.objectKey;
//                                        wsId = objectKey.substring(objectKey.lastIndexOf('/') + 1, objectKey.length);
//                                        /*jshint -W083 */
//                                        Worldstates.get({level: 2, fields: 'id,name,iccdata,actualaccessinfo, actualaccessinfocontenttype', deduplicate: false, 'wsId': wsId}, function (tmpWs) {
//                                            $scope.worldstates.push(tmpWs);
//                                        });
//                                        break;
//                                    }
//                                }
//                            } else if ($scope.treeSelection.length < $scope.worldstates.length) {
//                                //we need to find the deleted element in the treeSelection array.
//                                for (i = 0; i < $scope.worldstates.length; i++) {
//                                    ws = $scope.worldstates[i];
//                                    isContained = false;
//                                    /*jshint -W083 */
//                                    $scope.treeSelection.forEach(function (val) {
//                                        objectKey = val.objectKey;
//                                        wsId = parseInt(objectKey.substring(objectKey.lastIndexOf('/') + 1, objectKey.length));
//                                        if (parseInt(ws.id) === wsId) {
//                                            isContained = true;
//                                        }
//                                    });
//                                    if (!isContained) {
//                                        $scope.worldstates.splice(i, 1);
//                                        break;
//                                    }
//                                }
//                            }
                        }

                        if (DEBUG) {
                            console.log('DONE: receiving selected worldstates event: ' + arr);
                        }
                    };

                    if (newSelWsStringArray) {
                        try {
                            selWsStringArray = JSON.parse(newSelWsStringArray);

                            if ($.isArray(selWsStringArray)) {
                                resolve = [];

                                for (i = 0; i < selWsStringArray.length; ++i) {
                                    resolve[i] = Worldstates.get({wsId: selWsStringArray[i]}).$promise;
                                }

                                $q.all(resolve).then(function (selWsArray) {
                                    setArray(selWsArray);
                                });
                            } else {
                                if (DEBUG) {
                                    console.log('not an array: ' + selWsStringArray);
                                }
                                setArray([]);
                            }
                        } catch (e) {
                            if (DEBUG) {
                                console.log(e);
                            }
                            setArray([]);
                        }
                    } else {
                        setArray([]);
                    }
                };

                mashupPlatform.wiring.registerCallback('setSelectedWorldstates', setSelectedWsWirecloud);
            }
        }
    ]
).config(
    [
        '$provide',
        function ($provide) {
            'use strict';

            var mashupPlatform;

            if (typeof MashupPlatform === 'undefined') {
                console.log('mashup platform not available');
            } else {
                // enable minification
                mashupPlatform = MashupPlatform;
                $provide.constant('DEBUG', mashupPlatform.prefs.get('DEBUG'));
                $provide.constant('CRISMA_DOMAIN', mashupPlatform.prefs.get('CRISMA_DOMAIN'));
                $provide.constant('CRISMA_ICMM_API', mashupPlatform.prefs.get('CRISMA_ICMM_API'));
            }
        }
    ]
);
