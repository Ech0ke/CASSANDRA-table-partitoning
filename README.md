**Run:**<br />`docker-compose up`

**Enter cql shell**<br />`docker exec -it my-cassandra-container cqlsh`

**Create keyspace**<br />`CREATE KEYSPACE ks1 WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};`

**Run main method**<br />`node main.js`
