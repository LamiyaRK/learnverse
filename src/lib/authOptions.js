import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect from "@/lib/dbConnect";
import { loginUser } from "@/app/actions/auth/loginUser";



export const authOptions = {
  
  
  providers: [
   CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Enter your email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
    
      // Add logic here to look up the user from the credentials supplied
      const user = await loginUser(credentials)
        
      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
],
pages:{
    signIn:'/login'
},
callbacks: {
  async signIn({ user, account }) {
    if (account && account.provider !== "credentials") {
      const userCol = await dbConnect("user");

      const existingUser = await userCol.findOne({
        email: user.email,
      });

      if (!existingUser) {
        await userCol.insertOne({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          role: "student", // 👈 default role
          createdAt: new Date(),
        });
      }
    }
    return true;
  },

  // 🔐 store role in JWT
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
      token.id = user._id;
    }
    return token;
  },

  // 📦 expose role to client
  async session({ session, token }) {
    session.user.role = token.role;
    session.user.id = token.id;
    return session;
  },
},

}
