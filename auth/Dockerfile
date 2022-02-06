FROM node:alpine

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package.json ./

RUN npm install --production

COPY ./ ./

RUN npm run build 
# TODO not sure about this 
RUN npx rimraf src

# not sure if this is needed at all
# EXPOSE 3000

# not sure about the chown thing - might need to create additional folders or give permission if some folders are created later 

# https://github.com/vercel/next.js/discussions/19188
# RUN chown -R node /usr/app/.next/cache
# TODO not sure if needed this 
# USER node 
# https://github.com/vercel/next.js/discussions/19188
# RUN mkdir -p /usr/app/.next/cache/images

USER node 

CMD ["pm2-runtime", "npm", "--", "start"]

