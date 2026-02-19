async function makeRequests() {
    const url = 'http://localhost:3000/hello';

    console.log('Making 2 simultaneous requests...\n');

    // 2 simultaneous requests
    const [response1, response2] = await Promise.all([
        fetch(url),
        fetch(url)
    ]);

    const data1 = await response1.json();
    const data2 = await response2.json();

    console.log('Response 1:', data1);
    console.log('Response 2:', data2);

    console.log('\nRequests processed independently.');
}

makeRequests();