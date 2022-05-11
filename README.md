This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Deployment

Amazon EC2 Instance

```
ssh -i "~/path/to/aws-key.pem" ec2-user@ec2-3-80-49-79.compute-1.amazonaws.com
```

### install git
```
sudo yum install -y git
```
### clone repo onto server instance
```
git clone https://github.com/scottc11/minesweeper.git
```

You may need to set authorization to run setup bash script
```
chmod u+x ./minesweeper/ec2-server-setup.sh
```
