import path from 'path'; // Import the 'path' module

export default {
  mode: 'production',
  entry: './src/server.js', // Your entry point file
  output: {
    filename: 'bundle.js', // The output bundled file
    path: path.resolve('dist'), // Output folder
  },
  target: 'node', // This tells Webpack to bundle for Node.js (backend)
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Optional: if you're using Babel for ES6+ features
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
