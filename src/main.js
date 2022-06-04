function main(r) {
    r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
    r.log("in main")
    r.return(200, "hello NJSAPI! " + njsapi.version +"\n");
}

export default main
