```
@App:name("DataAnonymizer")
@App:description('Stream app to listen and to store data from eu fabric to global fabric.')
@App:qlVersion('2')

CREATE SOURCE pii_users WITH (type='database', collection='pii_users', replication.type="local", map.type='json') (emailidx string, loginidx string, phoneidx string, token string,key string );

CREATE SINK Users WITH (type='http', publisher.url='https://api-smoke4.eng.macrometa.io/_fabric/pii_global/_api/document/users?returnNew=false&returnOld=false&silent=true&overwrite=false', headers = "'Authorization: apikey demo.test.UTgO64Sk8W10BzrMbOPsVrrtsNgNyiV2dB7gGyimPg48eUYk5O3ZzKSIjQk8eIB78db86b'", map.type='json', map.payload = """{"name": "{{name}}", "token": "{{token}}", "email": "{{email}}", "phone": "{{phone}}","_key":"{{_key}}"}""") (name string,token string,email string,  phone string,_key string);

INSERT INTO Users
SELECT loginidx      as name,
       token,
       pii:fake(emailidx, "INTERNET_EMAILADDRESS", false)   as email,
       pii:fake(phoneidx, "PHONENUMBER_PHONENUMBER", false) as phone,
       token as _key
FROM pii_users;

```