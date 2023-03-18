
use accountantSystem;

# 紀錄
create table log(
	logId bigint not null unique auto_increment,
	userId bigInt default -1,
	userName varchar(50) default '',
	companyId bigInt default -1,
	companyCode varchar(50) default '',
	permession int default 2,
	routes varchar(100) default '',
	ip varchar(100) default '',
	params varchar(1000) default '',
	msg varchar(1000) default '',
	createTime timestamp default now(),
	lastModify timestamp default now()
);

# 蘭新金流上傳
# W, M, Y, D
create table donationTransaction(
	id varchar(20) unique not null,
	amount int(6) default 0 not null,
	cycle varchar(1) not null,
	cyclePeriod varchar(4) not null,
	authPeriod varchar(2) not null,
	creditNumber varchar(2000) not null,
	creditMaturity varchar(5) not null,
	productName varchar(100) not null,
	consumerName varchar(30),
	consumerTel varchar(2000),
	consumerAddr varchar(200),
	consumerEmail varchar(100) not null,
	consumerInvoiceTitle varchar(200),
	consumerInvoiceNumber int(8),
	recipientName varchar(200),
	recipientTel varchar(20),
	recipientAddr varchar(200),
	recipientEmail varchar(100),
	notifyUrl varchar(100),
	lastUserEdit varchar(10),
	createdAt timestamp default now(),
	updatedAt timestamp default now()
);

alter table donationTransaction add primary key (id);
