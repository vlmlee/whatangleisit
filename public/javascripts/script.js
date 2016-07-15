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

function conjugate(inputAngle) {
    var angle = Math.abs(inputAngle);
    if (angle > 180) {
        angle = 360 - angle;
        return angle;
    } else {
        return angle;
    }
}

function animateClockHands(sdegree, mdegree, hdegree) {
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
        sdegree = (sdegree + 6) % 360; // 360 degrees / 60 secs = 6 degrees per second
        mdegree = (mdegree + 0.1) % 360; // 360 degrees / 3600 secs (60 mins or one full revolution) = 0.1 degrees per second
        hdegree = (hdegree + 0.0083333) % 360; // 360 degrees / 43200 seconds (12 hours or one full revolution) = .0083333 degrees per second
        angleBetweenHourAndSecond = hdegree - sdegree;
        angleBetweenMinuteAndSecond = mdegree - sdegree;
        angleBetweenHourAndMinute = hdegree - mdegree;

        $('.hm-content').replaceWith('<h2 class=\"hm-content\">' + conjugate(angleBetweenHourAndMinute).toFixed(1) + '°</h2>');
        $('.ms-content').replaceWith('<h2 class=\"ms-content\">' + conjugate(angleBetweenMinuteAndSecond).toFixed(1) + '°</h2>');
        $('.hs-content').replaceWith('<h2 class=\"hs-content\">' + conjugate(angleBetweenHourAndSecond).toFixed(1) + '°</h2>');

        animateClockHands(sdegree, mdegree, hdegree);
    }, 1000);
}

$(document).ready(function() {

    setTimeout(function() {
        $('#loading').remove();
    }, 3000);

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

    $('.info').on('click', function() {
        $('.main').moveTo(3);
    });

    $('.top').on('click', function() {
        $('.main').moveTo(1);
    });

    var sdegree = angles.secondAngle(),
        mdegree = angles.minuteAngle(),
        hdegree = angles.hourAngle();

    animateClockHands(sdegree, mdegree, hdegree);

});
