## 审批工作流

基于官方示例[fabric-samples/balance-transfer](https://github.com/hyperledger/fabric-samples/tree/release-1.1/balance-transfer)

A sample Node.js app to demonstrate **__fabric-client__** & **__fabric-ca-client__** Node.js SDK APIs

### Prerequisites and setup:

* [Docker](https://www.docker.com/products/overview) - v1.12 or higher
* [Docker Compose](https://docs.docker.com/compose/overview/) - v1.8 or higher
* [Git client](https://git-scm.com/downloads) - needed for clone commands
* **Node.js** v8.4.0 or higher
* [Download Docker images](http://hyperledger-fabric.readthedocs.io/en/latest/samples.html#binaries)

```
cd workflow/workflow
```

Once you have completed the above setup, you will have provisioned a local network with the following docker container configuration:

* 2 CAs
* A SOLO orderer
* 4 peers (2 peers per Org)

#### Artifacts
* Crypto material has been generated using the **cryptogen** tool from Hyperledger Fabric and mounted to all peers, the orderering node and CA containers. More details regarding the cryptogen tool are available [here](http://hyperledger-fabric.readthedocs.io/en/latest/build_network.html#crypto-generator).
* An Orderer genesis block (genesis.block) and channel configuration transaction (mychannel.tx) has been pre generated using the **configtxgen** tool from Hyperledger Fabric and placed within the artifacts folder. More details regarding the configtxgen tool are available [here](http://hyperledger-fabric.readthedocs.io/en/latest/build_network.html#configuration-transaction-generator).

## Running the sample program

There are two options available for running the balance-transfer sample
For each of these options, you may choose to run with chaincode written in golang or in node.js.


##### Terminal Window 1

* Launch the network using docker-compose

```
docker-compose -f artifacts/docker-compose.yaml up
```
##### Terminal Window 2

* Install the fabric-client and fabric-ca-client node modules

```
npm install
```

* Start the node app on PORT 4000

```
PORT=4000 node app
```


现在，我们已经启动了网络，并且启用了balance-transfer案例为我们提供的restful接口。相关内容参考fabric 1.1版本的[fabric-samples/balance-transfer](https://github.com/hyperledger/fabric-samples/tree/release-1.1/balance-transfer)，其中我对app/invoke-chaincode进行了改动，让返回值为查询的结果，而不是交易id。

## Express

我们切换到Experss目录

```
cd workflow/Express
```
此目录是我用node.js Express框架搭建的应用，提供一个简单的web界面，调用restful api实现区块链的应用。

安装依赖包

```
npm install
```
运行app，默认运行在3000端口

```
node app
```
打开浏览器http://localhost:3000可以看到注册页面

首先进入http://localhost:3000/admin，依次点击页面上的链接，进行 **获取restful的token、创建channel、节点加入channel、安装chaincode、实例化chaincode**。此处可参照[fabric-samples/balance-transfer](https://github.com/hyperledger/fabric-samples/tree/release-1.1/balance-transfer)的readme。内置的参数与[fabric-samples/balance-transfer](https://github.com/hyperledger/fabric-samples/tree/release-1.1/balance-transfer)基本相同，区别是我们使用了自己编写的新的chaincode，增添了提案工作流的各项功能。
```
workflow/workflow/artifacts/src/github.com/example_cc/chain.go
```
 文件即为新的chaincode。
 
 在http://localhost:3000界面进行注册和登陆。用户type只能为student、teacher、school。school的id必须为0。
 
 界面待完善。

