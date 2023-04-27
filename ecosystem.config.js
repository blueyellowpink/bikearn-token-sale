module.exports = {
    apps: [
        {
            name: 'main:bikearn-presale',
            script: 'npx next start -p 8989',
        },
    ],
    deploy: {
        main: {
            user: 'root',
            host: '206.189.159.247',
            key: '~/.ssh/hwl-prod',
            ssh_options: 'Port=21125',
            ref: 'origin/master',
            repo: 'git@github.com:bikearn/bikearn-token-sale.git',
            path: '/root/bikearn/presale',
            'post-deploy':
                'export PM2_HOME=~/.pm2 && yarn && yarn build && pm2 startOrRestart ecosystem.config.js --only main:bikearn-presale',
        },
    },
}
