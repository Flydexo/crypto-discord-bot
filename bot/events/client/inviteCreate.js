module.exports = (client, invite) => {
    client.invites.set(invite.code, invite);
}