import passport from 'passport';
import GithubStrategy from 'passport-github';
import PassportStrategy from 'passport-facebook';
import KakaoStrategy from 'passport-kakao';
import InstagramStrategy from 'passport-instagram';
import User from './models/User';
import {
  githubLoginCallback,
  facebookLoginCallback,
  kakaoLoginCallback,
  instaLoginCallback,
} from './controllers/userController';
import routes from './routes';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `https://aqueous-forest-25551.herokuapp.com${routes.githubCallback}`,
    },
    githubLoginCallback,
  ),
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: process.env.GH_ID,
//       clientSecret: process.env.GH_SECRET,
//       callbackURL: process.env.PRODUCTION
//         ? `https://aqueous-forest-25551.herokuapp.com${routes.githubCallback}`
//         : `http://localhost:4000${routes.githubCallback}`,
//     },
//     githubLoginCallback,
//   ),
// );

passport.use(
  new PassportStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookCallback}`,
    },
    facebookLoginCallback,
  ),
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: process.env.PRODUCTION
        ? 'https://aqueous-forest-25551.herokuapp.com/oauth'
        : 'http://localhost:4000/oauth',
    },
    kakaoLoginCallback,
  ),
);

// 인스타에서 이메일 정보를 주지 않기 때문에 console.log 까지만 진행
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTA_ID,
      clientSecret: process.env.INSTA_SECRET,
      callbackURL: `http://localhost:4000${routes.instaCallback}`,
    },
    instaLoginCallback,
  ),
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
