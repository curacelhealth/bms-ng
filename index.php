<!DOCTYPE html>

<html lang="en" ng-app="BmsApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title data-ng-bind="'Curacel BMS | ' + $state.current.data.pageTitle">Curacel BMS</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="favicon.ico">


    <link href="assets/css/vendors.bundle.css" rel="stylesheet" type="text/css">
    <link href="assets/css/style.bundle.css" rel="stylesheet" type="text/css">
    <link href="assets/css/font.css" rel="stylesheet" type="text/css">
    <link href="assets/css/custom.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="assets/css/font.css" media="all">

    <script src="assets/js/webfont.js"></script>


    <script>
    /*    WebFont.load({
            google: {
                "families": ["Poppins:300,400,500,600,700", "Roboto:300,400,500,600,700"]
            },
            active: function() {
                sessionStorage.fonts = true;
            }
        });*/
    </script>
    

</head>




<body    class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default"  style="">

<div ui-view="main" > </div>



<script type="text/javascript" src="libs/angularjs/angular.min.js"></script>
<script type="text/javascript" src="libs/angularjs/plugins/angular-ui-router.min.js"></script>

<!-- plugins--->
<script src="libs/activityindicator/ngActivityIndicator.min.js"></script>
<link href="libs/activityindicator/ngActivityIndicator.min.css" rel="stylesheet">

<script src="libs/angular-jwt.min.js"></script>

<!-- end plugins--->

<!--- load app files proper--->
<script src="config.js"></script>
<script type="text/javascript" src="app.js"></script>

<script src="modules/main/js/routes.js"></script>
<script src="modules/main/js/controllers.js"></script>
<script src="modules/main/js/user-service.js"></script>




<!--begin:: theme Base Scripts -->
<script src="assets/js/vendors.bundle.js" type="text/javascript"></script>
<script src="assets/js/scripts.bundle.js" type="text/javascript"></script>
<!--end::Base Scripts -->

</body>

</html>