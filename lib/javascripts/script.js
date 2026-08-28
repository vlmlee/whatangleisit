var time = new Date(),
    animationTimer,
    angleTimer,
    angleBetweenHourAndSecond,
    angleBetweenMinuteAndSecond,
    angleBetweenHourAndMinute,
    angles = {
        hourAngle: function() {
            return (30 * time.getHours() + 0.5 * time.getMinutes());
        },
        minuteAngle: function() {
            return (6 * time.getMinutes() + 0.1 * time.getSeconds());
        },
        secondAngle: function() {
            return (6 * time.getSeconds());
        }
    };

// smooth animation plugin
$.fn.animateRotate = function(angle, degree, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(e, arguments);
        };

        $({ deg: degree }).animate({ deg: angle }, args);
    });
};
//

function conjugate(inputAngle) {
    var angle = Math.abs(inputAngle);
    return (angle > 180) ? 360 - angle : angle;
}

var arcRadii = {
    h: 800,
    hm: 600,
    ms: 400,
    hs: 200
};

function normalizeAngle(angleDeg) {
    return ((angleDeg % 360) + 360) % 360;
}

function setArcLength(selector, radius, angleDeg, useConjugate) {
    var circumference = 2 * Math.PI * radius;
    var angle = useConjugate ? conjugate(angleDeg) : normalizeAngle(angleDeg);
    var drawn = circumference * (angle / 360);
    $(selector).css({
        'stroke-dasharray': circumference,
        'stroke-dashoffset': circumference - drawn
    });
}

function updateArcs(hdegree) {
    setArcLength('.arc-hour', arcRadii.h, hdegree, false);
    setArcLength('.arc-outer', arcRadii.hm, angleBetweenHourAndMinute, true);
    setArcLength('.arc-mid', arcRadii.ms, angleBetweenMinuteAndSecond, true);
    setArcLength('.arc-inner', arcRadii.hs, angleBetweenHourAndSecond, true);
}

function updateAngleDisplays(sdegree, mdegree, hdegree) {
    $('.h-content-absolute').html(conjugate(hdegree).toFixed(1) + '°');
    $('.m-content-absolute').html(conjugate(mdegree).toFixed(1) + '°');
    $('.s-content-absolute').html(conjugate(sdegree).toFixed(1) + '°');

    $('.hm-content').html(conjugate(angleBetweenHourAndMinute).toFixed(1) + '°');
    $('.ms-content').html(conjugate(angleBetweenMinuteAndSecond).toFixed(1) + '°');
    $('.hs-content').html(conjugate(angleBetweenHourAndSecond).toFixed(1) + '°');
}

function animateClockHands(sdegree, mdegree, hdegree) {
    angleBetweenHourAndSecond = hdegree - sdegree;
    angleBetweenMinuteAndSecond = mdegree - sdegree;
    angleBetweenHourAndMinute = hdegree - mdegree;

    updateAngleDisplays(sdegree, mdegree, hdegree);
    updateArcs(hdegree);

    $('img.secondhand').animateRotate(sdegree + 6, sdegree, 1000, "linear");

    $('img.minutehand').css({
        '-moz-transform': 'rotate(' + mdegree + 'deg)',
        '-webkit-transform': 'rotate(' + mdegree + 'deg)',
        '-o-transform': 'rotate(' + mdegree + 'deg)',
        '-ms-transform': 'rotate(' + mdegree + 'deg)',
        'transform': 'rotate(' + mdegree + 'deg)'
    });

    $('img.hourhand').css({
        '-moz-transform': 'rotate(' + hdegree + 'deg)',
        '-webkit-transform': 'rotate(' + hdegree + 'deg)',
        '-o-transform': 'rotate(' + hdegree + 'deg)',
        '-ms-transform': 'rotate(' + hdegree + 'deg)',
        'transform': 'rotate(' + hdegree + 'deg)'
    });

    animationTimer = setTimeout(function() {
        sdegree = (sdegree + 6) % 360;
        mdegree = (mdegree + 0.1) % 360;
        hdegree = (hdegree + 0.0083333) % 360;
        animateClockHands(sdegree, mdegree, hdegree);
    }, 1000);
}

var viewState = { analog: false, absolute: true, darkMode: true };

function setAnalog(value) {
    viewState.analog = value;
    if (value) {
        $('.analog-clock').show();
        $('.clock-type .analog').css('text-decoration', 'underline');
        $('.clock-type .digital').css('text-decoration', 'none');
        $('.digital-clock').hide();
        $('.digital-clock-type').hide();
    } else {
        $('.analog-clock').hide();
        $('.digital-clock').show();
        $('.digital-clock-type').show();
        $('.clock-type .analog').css('text-decoration', 'none');
        $('.clock-type .digital').css('text-decoration', 'underline');
    }
}

function setAbsolute(value) {
    viewState.absolute = value;
    if (value) {
        $('.absolute-clock').show();
        $('.relative-clock').hide();
    } else {
        $('.absolute-clock').hide();
        $('.relative-clock').show();
    }
}

function setDarkMode(value) {
    viewState.darkMode = value;
}

$(document).ready(function() {
    setAnalog(viewState.analog);
    setAbsolute(viewState.absolute);
    setDarkMode(viewState.darkMode);

    setTimeout(function() {
        $('#loading').remove();
    }, 2000);

    $('.main').onepage_scroll({
        sectionContainer: 'section',
        easing: 'ease',
        responsiveFallback: 600,
        updateURL: true,
        loop: false,
        direction: 'vertical'
    });

    $('.about').on('click', function() {
        $('.main').moveTo(2);
    });

    $('.more').on('click', function() {
        $('.main').moveTo(3);
    });

    $('.info').on('click', function() {
        $('.main').moveTo(4);
    })

    $('.top').on('click', function() {
        $('.main').moveTo(1);
    });

    var sdegree = angles.secondAngle(),
        mdegree = angles.minuteAngle(),
        hdegree = angles.hourAngle();

    animateClockHands(sdegree, mdegree, hdegree);

});
