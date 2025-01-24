
const startupClient = async (client) => {
    await client.connect();
  
    await client.set('foo', 'bar');
    
    console.log('>> Set client record "foo" to "bar"')  // >>> bar
    const result = await client.get('foo');

    
    console.log('>> Query record "foo" = '+ result)  // >>> bar
}

module.exports = {
    startupClient
}