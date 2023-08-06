# p5-ts-starter '2023

A starter for instance-mode p5.js with TypeScript, and Parcel 2 bundler.

Unlike with the global-mode starter, you can install and import other packages as normal.

### using p5.sound

To use the sound library, import
`import 'p5/lib/addons/p5.sound';`
and then use the constructors as normal:
`const myOsc = new p5.Oscillator(440, 'sine');`
note that the type for Oscillator constructor seems to need this two param form.
