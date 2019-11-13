# LarkVote
LarkVote投票系统是一套基于规则的企业内部投票系统，由投票管理和投票端两部分组成，投票管理端包括投票创建、投票编辑、规则编辑、投票发起、投票项管理、邀请码生成、结束投票、投票结果统计等功能；投票端包括投票规则展示、投票操作、提交结果等功能。目前该项目还处于初级阶段，欢迎各位大神创建pull request。

## 主要技术
SpringBoot v1.5.3

Thymeleaf v2.1.5

EasyExcel v2.0.0

FastJson v1.2.60

H2Database v1.4.194 

Bootstrap v4.3

## 部署方式
项目使用工具

IntelliJ IDEA、JDK 1.8、apache-maven-3.3.9

使用IDEA导入项目，启动main方法即可，由于本项目使用的是H2数据库，所以不需要安装数据库。
## 平台设计
安全性设计，自定义注解使用数据库的方式做特殊接口安全性。

数据层设计，使用spring-jpa做数据层接口查询，写法简便便于集成。

全局异常设计，统一处理异常转发到error页面。

认证授权设计，使用spring-security做用户认证。

动态投票项设计，支持投票项模板下载，excel导入动态生成投票项数据。

## 投票过程

|--------- 创建投票项  
|------------- 设置投票轮1  
|--------------- 动态导入投票项  
|--------------- 发起投票  
|--------------- 生成投票邀请码  
|--------------- 用户点击邀请码，根据规则开始进行投票  
|--------------- 根据规则，创建人选择结束投票  
|--------------- 统计，动态生成统计结果，并依据结果进行划分序列  
|------------- 设置投票轮2  
|--------------- 使用上一轮投票项  
|--------------- 投票操作如上  
|--------------- 筛选得出结论  
