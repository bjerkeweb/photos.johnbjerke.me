const fs          = require('fs');
const exiftool    = require('node-exiftool');
const exiftoolBin = require('dist-exiftool');
const ep          = new exiftool.ExiftoolProcess(exiftoolBin);

// read exif data
ep
  .open()
  .then( ( pid ) => console.log( 'Started exiftool process %s', pid ) )
  .then( () => ep.readMetadata( './public/images/' ) )
  .then( res => logData(res) )
  .then( () => ep.close() )
  .then( () => console.log('Closed exiftool') )
  .catch( err => console.log(err) );

// log exif data
const logData = (exifData) => {
  const fileInfo = exifData.data.map( image => {
    
    // calculate aspect ratio (W * x = H)
    const aspectRatio = image.ImageSize
      .split('x')
      .map( n => parseInt(n) )
      .reduce( (w, h) => h/w );
    
    return {
      fileName: image.FileName,
      aspectRatio,
      fStop: image.FNumber,
      iso: image.ISO,
      focalLength: image.FocalLength.replace( ' ', '' ),
      shutterSpeed: image.ShutterSpeed
    }
  });

  // sort by filename
  fileInfo.sort( ( a, b ) => {
    let keyA = parseInt( a.fileName.split('.')[0] );
    let keyB = parseInt( b.fileName.split('.')[0] );
    if ( keyA < keyB ) return -1;
    if ( keyA > keyB ) return 1;
    return 0;
  });

  // write file data to json
  const writeString = `export default imageData = ${JSON.stringify(fileInfo, null, 2)};`

  fs.writeFile( './src/manifest.js', writeString, (err) => {
    if (err) return console.log(err);
  });
}
