# orphanarium

Find non-required files in your source tree. For big [browserify](http://browserify.org/)
project, this can turn up orphaned files.

## Installation

```
npm install -g orphanarium
```

## Usage

Point browserify at your entry point and run it with `--deps` to make it
output dependency paths. Orphanarium takes a single argument, the root
directory of files it should expect to be included.

```
browserify --deps src/index.jsx | orphanarium src
```

The utility outputs the full paths of non-included files, line by line.
