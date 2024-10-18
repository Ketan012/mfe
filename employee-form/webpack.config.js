const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath: "http://localhost:3001/",
  },
  mode: "development",
  devServer: {
    port: 3001,
    open: false,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "employeeForm",
      filename: "remoteEntry.js",
      exposes: {
        "./EmployeeForm": "./src/components/EmployeeForm/EmployeeForm",
      },
      shared: {
        react: {
            singleton: true,
            strictVersion: true,
            requiredVersion: '18.3.1',
        },
        'react-dom': {
            singleton: true,
            strictVersion: true,
            requiredVersion: '18.3.1',
        },
    },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
