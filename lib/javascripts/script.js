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

function updateArcs(hdegree, mdegree, sdegree) {
    setArcLength('.arc-hour', arcRadii.h, hdegree, false);
    setArcLength('.arc-minute', arcRadii.hm, mdegree, false);
    setArcLength('.arc-second', arcRadii.ms, sdegree, false);
    setArcLength('.arc-outer', arcRadii.hm, angleBetweenHourAndMinute, true);
    setArcLength('.arc-mid', arcRadii.ms, angleBetweenHourAndSecond, true);
    setArcLength('.arc-inner', arcRadii.hs, angleBetweenMinuteAndSecond, true);
}

function updateAngleDisplays(sdegree, mdegree, hdegree) {
    $('.h-content-absolute').html(hdegree.toFixed(1) + '°');
    $('.m-content-absolute').html(mdegree.toFixed(1) + '°');
    $('.s-content-absolute').html(sdegree.toFixed(1) + '°');

    $('.hm-content').html(conjugate(angleBetweenHourAndMinute).toFixed(1) + '°');
    $('.ms-content').html(conjugate(angleBetweenMinuteAndSecond).toFixed(1) + '°');
    $('.hs-content').html(conjugate(angleBetweenHourAndSecond).toFixed(1) + '°');
}

function animateArcs(sdegree, mdegree, hdegree) {
    angleBetweenHourAndSecond = hdegree - sdegree;
    angleBetweenMinuteAndSecond = mdegree - sdegree;
    angleBetweenHourAndMinute = hdegree - mdegree;

    updateAngleDisplays(sdegree, mdegree, hdegree);
    updateArcs(hdegree, mdegree, sdegree);

    animationTimer = setTimeout(function() {
        sdegree = (sdegree + 6) % 360;
        mdegree = (mdegree + 0.1) % 360;
        hdegree = (hdegree + 0.0083333) % 360;
        animateArcs(sdegree, mdegree, hdegree);
    }, 1000);
}

var viewState = { analog: false, absolute: true, darkMode: false, hide: false };

function setAnalog(value) {
    viewState.analog = value;
    $('.clock-type')
        .attr('data-mode', value ? 'analog' : 'digital')
        .find('.pill-toggle__option')
        .removeClass('is-active');
    $('.clock-type').find(value ? '.analog' : '.digital').addClass('is-active');

    if (value) {
        $('.analog-clock').show();
        $('.digital-clock').hide();
    } else {
        $('.analog-clock').hide();
        $('.digital-clock').show();
    }
}

function setAbsolute(value) {
    viewState.absolute = value;
    $('.clock-mode')
        .attr('data-mode', value ? 'absolute' : 'relative')
        .find('.pill-toggle__option')
        .removeClass('is-active');
    $('.clock-mode').find(value ? '.absolute' : '.relative').addClass('is-active');

    if (value) {
        $('.absolute-clock').show();
        $('.absolute-analog-clock').show();
        $('.relative-clock').hide();
        $('.relative-analog-clock').hide();
        $('.relative-analog-indicators').hide();
        $('.absolute-analog-indicators').show();
    } else {
        $('.absolute-clock').hide();
        $('.absolute-analog-clock').hide();
        $('.relative-clock').show();
        $('.relative-analog-clock').show();
        $('.relative-analog-indicators').show();
        $('.absolute-analog-indicators').hide();
    }
}

function setDarkMode(value) {
    viewState.darkMode = value;
    $('.section-1')
        .toggleClass('is-dark', value);
    $('.dark-mode')
        .toggleClass('is-dark', value);
    $('.arc-hour, .arc-minute, .arc-second, .arc-outer, .arc-mid, .arc-inner').css({
        'stroke': value ? '#f9f9f9' : '#222222'
    });
}

function toggleHideUI() {
    viewState.hide = !viewState.hide;
    $('.section-1').toggleClass('is-ui-hidden', viewState.hide);
    $('.hide-ui')
        .toggleClass('is-hidden', viewState.hide)
        .attr('aria-label', viewState.hide ? 'Show controls' : 'Hide controls')
        .attr('title', viewState.hide ? 'Show controls' : 'Hide controls');
}

$(document).ready(function() {
    setAnalog(viewState.analog);
    setAbsolute(viewState.absolute);
    setDarkMode(viewState.darkMode);

    setTimeout(function() {
        $('body').css('opacity', 1);
    }, 1000);

    setTimeout(function() {
        $('#loading').fadeOut(500, function() {
            $(this).remove();
        });
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

    animateArcs(sdegree, mdegree, hdegree);
});
