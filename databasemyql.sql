
	drop database if exists trouce;
	create database trouce;			
	use trouce;

	create table Users (id INT AUTO_INCREMENT PRIMARY KEY, usertype INT, artistname varchar(30), name varchar(30), lastname varchar(30), phone varchar(20), contactphone varchar(20), creationdate varchar(30), city varchar(30), whatsapp int(1), experience longtext, achievements longtext, services longtext,
	paymentmethod longtext, contactemail varchar(60), email varchar(60), password text, picture LONGTEXT, location TEXT, sharelocation INT(1));

	create table Genres (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(30), src longtext, description longtext, amountofusers int);

	create table Usergenres(userid INT, genreid INT, PRIMARY KEY (userid, genreid)); 

	create table Userinstruments(userid INT, instrument INT, PRIMARY KEY (userid, instrument));

	create table Instruments(id INT AUTO_INCREMENT PRIMARY KEY, name varchar(30), src longtext, description longtext, amountofusers int);

	create table Publications(id INT AUTO_INCREMENT PRIMARY KEY, userid INT, description varchar(800), date varchar(200));

	create table Contents( id INT AUTO_INCREMENT PRIMARY KEY, src LONGTEXT, format varchar(50));

	create table PublicationContents( pubid INT,  contentid INT, PRIMARY KEY (pubid, contentid));

	insert into Users(usertype, artistname, name, lastname, phone, creationdate, city , whatsapp, experience, achievements, services,
	paymentmethod, email, password, contactphone, contactemail) values 
	(1, "Desadaptados", "Pedro", "Montes", "5454554", "24/05/15", "Pereira", "1", "Ninguna", "Ninguno","Ofrecemos servicios de banda para todo tipo de eventos", "En Especie", "pedro@montes.com", "qwerty123", "3104884823", "qwer@qwer.com");  

	ALTER TABLE trouce.Genres CONVERT TO CHARACTER SET utf8;
	ALTER TABLE trouce.Instruments CONVERT TO CHARACTER SET utf8;
	insert into Genres(name, src) values ("Jazz", "https://cdn.forbes.com.mx/2016/04/jazzzz.jpg");
	insert into Genres(name, src) values ("Rock", "https://files.rcnradio.com/public/styles/image_834x569/public/2018-08/rock_al_parque_0_0_0.png?itok=5wp2X4yI");
	insert into Genres(name, src) values ("Salsa", "http://4.bp.blogspot.com/-UFjSv_tGdYk/UkqxMRrefkI/AAAAAAAAAZE/cochrvI3cFA/s1600/salsa.jpg");
	insert into Genres(name, src) values("Bambuco", "https://i.pinimg.com/564x/51/c3/4e/51c34e5dde003a0a7fadf6b220d6ad85.jpg");
	insert into Genres(name, src) values("Pacífica", "https://www.calendariodecolombia.com/img/fiestas-nacionales/98-festival-de-la-musica-del-pacifico-petronio-alvarez-en-cali1468368907.jpg");
	insert into Genres(name, src) values("Cubana", "https://www.pequodrivista.com/wp-content/uploads/2016/12/Cuba.jpg");
	insert into Genres(name, src) values("Tropical", "https://www.tropical-islands.de/fileadmin/_processed_/0/8/csm_2017-02-21_TI_stage-suedsee_c51463ac38.jpg");
	insert into Genres(name, src) values("Blues", "https://headtopics.com/images/2019/6/15/milenio/blues-la-m-sica-del-delta-del-mississippi-resena-1139940632149942274.webp");
	insert into Genres(name, src) values("Metal", "http://anband.spb.ru/images/100/DSC100129538.jpg");
	insert into Genres(name, src) values("Pop", "https://i.ytimg.com/vi/Sb2mmZQK9ts/maxresdefault.jpg");
	insert into Genres(name, src) values("Punk", "https://pbs.twimg.com/media/EBYBM8BXYAA-alh.jpg");
	insert into Genres(name, src) values("Rap","https://futurewavehome.files.wordpress.com/2018/08/band-celebration-concert-1047938.jpg?w=1024");
	insert into Genres(name, src) values("Popular", "https://conexioncapital.co/wp-content/uploads/2018/03/la-escena-popular.jpg");
	
	insert into Instruments(name, src) values ("Guitarra", "https://cdn.shopify.com/s/files/1/2783/6766/products/bondi-ukuleles-bondi-tiger-oak-tenor-ukulele-tribal-bundle-3797469757488_2048x.jpg?v=1572938803");
	insert into Instruments(name, src) values ("Guitarra Eléctrica", "https://d1aeri3ty3izns.cloudfront.net/media/3/3575/1200/preview_2.jpg");
	insert into Instruments(name, src) values ("Bajo", "https://http2.mlstatic.com/D_NQ_NP_907785-MLA31626339181_072019-W.jpg");
	insert into Instruments(name, src) values ("Piano", "https://i.pinimg.com/originals/54/13/b2/5413b2bb5a4e506d5988747d7c490627.png");
	insert into Instruments(name,src) values ("Voz", "https://cdn.britannica.com/38/200938-050-E22981D1/Freddie-Mercury-Live-Aid-Queen-Wembley-Stadium-July-13-1985.jpg");
	insert into Instruments(name,src) values ("Batería", "http://3.bp.blogspot.com/-9dY3zRoOv1k/TphMi0S-fsI/AAAAAAAABBQ/27-r8qKuls4/s1600/BATERIA001.jpg");
	insert into Instruments(name,src) values ("Timbal", "https://images-na.ssl-images-amazon.com/images/I/41vuvxuZZ8L.jpg");
	insert into Instruments(name, src) values ("Saxofón", "https://tmsmusic.co/media/catalog/product/cache/2/image/10c74f2c1ca848675afe389f18889cc3/5/6/567gl.jpg");
	insert into Instruments(name) values ("Trompeta", "https://www.sanganxa.com/wp-content/uploads/2014/05/JTR-606-MRL.jpg");
	
	insert into Usergenres(userid, genreid) values (1,1);
	insert into Userinstruments(userid, instrument) values (1,1);

SET GLOBAL max_allowed_packet=1024*1024*1024;

