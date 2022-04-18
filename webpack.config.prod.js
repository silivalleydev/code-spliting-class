const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const version = require('./package.json').version;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, options) => {
  const config = {
    mode: 'production',
    /**
     * entry point란 진입점에 해당함. 
     * 진입점 파일을 기준으로 모든 js, css파일들을 묶어 하나의 js로 만들어주며, 
     * 기준점에 있는 모든 이미지나 파일들을 output 파일로 반환해준다.
     * 이를 번들링이라고 한다.
     * 번들링: 여러개의 파일(.js, .css, .png 등 파일들)을 하나의 파일로 묶어 패키징을 시키는 과정
     *  */
    entry: './src/index.js',
    /**
     * output은 번들링된 코드를 어떤 경로에 어떤 js이름으로 생성할 것인가 설정하는 것이다.
     * filename은 파일이름을 어떻게 내보낼 것인가 인데 보통은 지정한이름.bundle.js를 통상적으로 사용
     * path는 디렉토리에서 어느 경로에 번들링한 파일을을 생성할 것인가 지정하는 것.
     */
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
      path: path.resolve(
        __dirname + '/build'
      )
    },
    /**
     * optimization은 빌드 과정을 커스터마이징하는 옵션이다
     * 최적화 과정을 하는 이유는 코드가 많아지면 번들링된 결과물이 메가바이트 단위로 커지게 되어, 브라우저 성능에 영향을 준다.
       그래서 웹팩으로 번들 결과를 압축하거나 분리하여 최적화를 한다.
     */
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin(), // OptimizeCSSAssetsPlugin => css 파일 빈칸을 없애서 압축
        /** TerserPlugin은
         * 기본 설정으로 JavaScript 코드를 난독화 하고 debugger 구문을 제거
            console.log를 제거하는 옵션도 있다.
         */
        new TerserPlugin({
          terserOptions: {
            compress: {
              // console.log를 제거하는 옵션
              drop_console: true,
            }
          }
        })
      ],  
      /**
       * 코드 스플리팅 개념
       * 코드를 압축해도, 프로젝트가 커지면 브라우저 성능에 영향을 줄 수 있다.
          결과물을 나누어 쪼개서 브라우저에서 다운로드 속도를 높인다.
          큰 파일 하나를 다운받는 것 보다 작은 파일 여러개를 동시에 다운받는 것이 빠르다.

          Optimization SplitChunks
          이 문제를 해결하기 위해서 중복되는 요소를 하나의 Chunk(덩어리, 묶음)로 분리해서 사용하도록 해야한다. 
          Webpack4부터 이 방식을 알아서 지원해주는 optimization.splitChunks.chunks를 이용하면, 
          중복되는 Chunk 코드 요소를 줄여서 Bundle Size를 최적화 시킬 수 있다.

          chunks option은 아래와 같다.

          initial: 기본 Chunk Spliting.
          async: 비동기로 호출하는 요소 중 중복되는 부분을 Spliting.
          all: 모든 코드의 중복되는 요소들을 확인하여 Spliting.

          Webpack 공식 Doc에는 'all'을 쓰는 것을 권장
       */
      splitChunks: {
        // cachegroups은 특정 조건으로 chunk를 생성하라고 webpack 명령을 내리는 것이다.
        cacheGroups: {
          commons: {
            // node_modules를 포함하고
            test: /[\\/]node_modules[\\/]/,
            // vendors라는 이름을 가진 번들코드 파일을 생성한다.
            name: 'vendors',
            chunks: 'all'
          },
        },
      },
    },
    module: {
      rules: [
        {
          // test란 정규표현식으로 적용되는 파일들을 설정
          test: /\.(js|jsx)$/,
          // exclude 컴파일하지 않을 폴더 설정
          exclude: '/node_modules',
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {targets: {node: 'current'}}],
              ['@babel/preset-react', {targets: {node: 'current'}}]
            ],
            plugins: [
                /**
               * Dynamic import
               * 
               * 첫 페이지 진입시에 필요한 최소한의 코드만 다운 받고, 
               * 사용자가 특정 페이지나 위치에 도달할 때마다 코드를 로드 한다면, 
               * 첫 페이지의 초기 성능을 올릴 수 있습니다.
                 
                이런 방식을 lazy-load, 게으른 로딩이라고 합니다.
                  
                이러한 방식을 적용하는 기술이 Dynamic Import 입니다,
                다이내믹 임포트를 사용하면 런타임시에 필요한 module 을 import 할 수 있습니다.
               *   
                동작방식은 Build 시점에 import() 모듈을 chunk 파일로 만들며, 
                필요한 시점에 header 에 script 를 세팅하여 JS 파일을 다운로드 합니다.
               */
              // 다이내믹 임포트를 적용하는것은 아래 플러그인을 적용하면됩니다.
              '@babel/plugin-syntax-dynamic-import'
            ]
          },
        },
        {
          test: /\.html$/,
          // use에 사용할 로더 설정
          use: [
            {
              loader: 'html-loader',
              options: { minimize: false },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader", // CSS를 DOM에 삽입하는 로더
            "css-loader" // import로 불러온 css파일을 해석하는 로더
          ],
        },
        {
          // file-loader는 import/ require()로 가져온 파일들을 output으로 생성하는것.
          test: /\.(png|jpe?g|gif|mp3|mp4|wav|wma|ogg|ttf|woff2|woff|eot|svg|ico)$/i,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      // 전체 디렉토리 구조를 유지하며 파일을 내보내려면 다음처럼 하면된다.
                      name: '[path][name].[ext]'
                  },

              },
          ],
        }
      ],
    },
    plugins: [
      /**
       * CleanWebpackPlugin은 빌드 이전 결과물을 제거하는 플러그인으로 
       * 빌드 결과물은 웹팩에서 아웃풋 경로에 설장한 곳으로 폴더 및 파일들이 모이는데 
       * 빌드 했을시 이전 빌드내용이 삭제되지 않고 그대로 남아있는 경우도 있어 이것을 해결해주는 플러그인이다.
       */
      new CleanWebpackPlugin(),
      /**
       * HtmlWebPackPlugin
       * html 파일을 템플릿으로 생성할 수 있게 도와주는 플러그인이다
       */
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: 'index.html',
      }),
      /**
       * MiniCssExtractPlugin
       * 번들 결과에서 CSS를 별도의 파일로 추출하는 플러그인으로, 
       * JS파일 당 CSS파일을 작성한다. 
       * 브라우저에서 큰 파일을 하나 내려 받는 것보단 작은 파일을 여러개 다운로드하는 것이 더 빠르다.
       */
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      /**
       * manifest.json을 생성해 매번 생성된 최종결과물과 매치되는 스태틱한 파일명을 
       * alias와 같은 형태로 사용할 수 있게 해주므로 import시는 고정값을 사용가능하게 됨
       * 
       * 번들링이 끝나면 지정된 경로 manifest.json 파일이 생기는
          번들링을 통해 생성된 파일들의 정보가 manifest.json 파일에 기록된다
          그래서 우리는 이 json 파일을 읽어 어떠한 파일이 어떠한 이름으로 최종적으로 번들링되어 파일이 생성되었는지 알 수 있다
       * webpack resolve의 alias에 '@C': path.resolve(__dirname, 'src/components/') 라고 설정했다고 가정했을때,
       * import CustomComponent from '@C/CustomComponent'; <= 이런식으로 import 가능하게 해줌
       * 공통적으로 쓰이는 컴포넌트 경로를 import 할때 경로를 단축하여 코드를 작성할 수 있어 유용하다
       */
      new ManifestPlugin({
        fileName: 'manifest.json',
      }),
      // new BundleAnalyzerPlugin(),
      /**
       * DefinePlugin
       *  컴파일 타임에 구성할 수 있는 전역 상수를 만들 수 있다. 
       * 이는 개발 빌드와 프로덕션 빌드 간에 서로 다른 동작을 하고 싶을 때 유용하다.
       * 
       */
      new webpack.DefinePlugin({
        DEF_TARGET: JSON.stringify(options.target || 'web'),
        DEF_MODE: JSON.stringify(options.mode),
        APP_VERSION: JSON.stringify(version),
      }),
      // copy-webpack-plugin: 웹팩이 실행될 때 패키지 빌드 파일을 복사
      // new CopyPlugin([{
      //   // 어디에있는것을 복사하여 가져올지
      //   from: './node_modules/axios/dist/axios.min.js',
      //   to: './axios.min.js'
      // }])
    ],

    /**
     * externals
     * 번들하지말아야할 대상은 빌드 범위에서 빼는 것
      패키지들은 보통 빌드된 파일이 있다.
      dist 폴더
    //  */
    // externals: {
    //   // 웹팩으로 빌드시 axios 사용하는 부분이 있으면 전역변수 axios 사용하는 것으로 간주
    //   axios: 'axios'
    // },
    resolve: {
      // resolve.extensions 는 import할때 확장자를 붙이지 않아도 되도록 하는 역할을 한다
      extensions: ['.js', '.jsx'],
      // 특정 모듈을 더욱 쉽게 import 혹은 require 하기 위해 aliases 를 생성한다.
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@C': path.resolve(__dirname, 'src/components/'),
        '@COMMON': path.resolve(__dirname, 'src/components/common'),
        '@STYLE': path.resolve(__dirname, 'src/css'),
        '@IMG': path.resolve(__dirname, 'src/assets/img'),
      },
    },
  };

  return config;
};
