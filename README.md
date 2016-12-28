# What Angle Is It?

## About

This project was inspired by [What Colour Is It?](http://whatcolourisit.scn9a.org/). I used it as my screensaver and thought 
an angle variant would be interesting.

## Solution?

The way to figure out the angle between the clock hands is to realize that you can independently calculate the angle of each clock hand relative to 12 o’clock. By taking the difference of any two angles, you can get the angle in between. 

We break up the angles into three parts: the second, minute, and hour hands. It takes 60 seconds for the second hand to complete 360 degrees, 3600 seconds for the minute hand to complete 360 degrees, and 43200 seconds for the hour hand to complete 360 degrees. This means that the second hand moves 6 degrees per second. 

By the same calculation, the minute hand moves 0.1 degrees per second, and the hour hand, 0.00833 degrees per second. For every minute, the second hand completes 360 degrees, the minute hand completes 6 degrees, and the hour hand completes 0.5 degrees. Likewise, every hour the hands complete 21,600, 360, and 30 degrees respectively. 

With this in mind, the angle of the hour hand relative to 12 o'clock is 30 degrees times the hour plus some offset that is dependent on the minute and second. But we've already found out what that offset was; we add 0.5 degrees for every minute and 0.00833 degrees for every second that had passed. 

So for the hour hand, the formula is 30 * H + 0.5 * M + .00833 * S. Likewise, the minute hand is 6 * M + 0.1 * S (the minute hand doesn't depend on the hour hand for an offset) and the second hand is 6 * S.

What about the angle in between? Simply subtract one from another.

```
    30 * H + 0.5 * M + .00833 * S − (6 * M + 0.1 * S) = 30 * H − 5.5 * M − .091667 * S
```

The code for the clock itself simply does a smooth rotation animation with those calculated angles. Cool, right?

## License: MIT

Copyright (c) 2016 vlmlee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
