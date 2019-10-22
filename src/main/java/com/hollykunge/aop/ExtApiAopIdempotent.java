package com.hollykunge.aop;

import com.hollykunge.annotation.ExtApiIdempotent;
import com.hollykunge.annotation.ExtApiToken;
import com.hollykunge.constants.VoteConstants;
import com.hollykunge.service.ExtTokenService;
import com.hollykunge.util.ExceptionCommonUtil;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Aspect
@Component
public class ExtApiAopIdempotent {
	@Autowired
	private ExtTokenService extTokenService;

	@Pointcut("execution(public * com.hollykunge.controller.*.*(..))")
	public void rlAop() {
	}

	// 前置通知转发Token参数
	@Before("rlAop()")
	public void before(JoinPoint point) {
		MethodSignature signature = (MethodSignature) point.getSignature();
		ExtApiToken extApiToken = signature.getMethod().getDeclaredAnnotation(ExtApiToken.class);
		if (extApiToken != null) {
			HttpServletRequest request = getRequest();
			String clientIp = getClientIp(request);
			extApiToken(clientIp);
		}
	}

	// 环绕通知验证参数
	@Around("rlAop()")
	public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		MethodSignature signature = (MethodSignature) proceedingJoinPoint.getSignature();
		ExtApiIdempotent extApiIdempotent = signature.getMethod().getDeclaredAnnotation(ExtApiIdempotent.class);
		if (extApiIdempotent != null) {
			return extApiIdempotent(proceedingJoinPoint, signature);
		}
		// 放行
		Object proceed = proceedingJoinPoint.proceed();
		return proceed;
	}

	// 验证Token
	public Object extApiIdempotent(ProceedingJoinPoint proceedingJoinPoint, MethodSignature signature)
			throws Throwable {
		ExtApiIdempotent extApiIdempotent = signature.getMethod().getDeclaredAnnotation(ExtApiIdempotent.class);
		if (extApiIdempotent == null) {
			// 直接执行程序
			Object proceed = proceedingJoinPoint.proceed();
			return proceed;
		}
		// 代码步骤：
		// 1.获取令牌 存放在请求头中
		HttpServletRequest request = getRequest();
		String valueType = extApiIdempotent.value();
		if (StringUtils.isEmpty(valueType)) {
			response("参数错误!");
			log.warn("参数错误！");
			return null;
		}
		String token = null;
		if (valueType.equals(VoteConstants.EXTAPIHEAD)) {
			token = (String) request.getSession().getAttribute("vote_token");
		} else {
			token = request.getParameter("vote_toke");
		}
		if (StringUtils.isEmpty(token)) {
			response("参数错误!");
			log.warn("没有找到重复表单的token！");
			log.warn("参数错误！");
			return null;
		}
		if (!extTokenService.findToken(token)) {
			response("请勿重复提交!");
			log.warn("系统检测到 --->>>>>重复提交表单数据！");
			return null;
		}
		Object proceed = proceedingJoinPoint.proceed();
		return proceed;
	}

	public void extApiToken(String clentIp) {
		String token = null;
		try {
			token = extTokenService.getToken(clentIp);
		} catch (Exception e) {
			log.error(ExceptionCommonUtil.getExceptionMessage(e));
		}
		getRequest().setAttribute("vote_token", token);
		getRequest().getSession().setAttribute("vote_token",token);
	}

	public HttpServletRequest getRequest() {
		ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = attributes.getRequest();
		return request;
	}

	public void response(String msg) throws IOException {
		ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		HttpServletResponse response = attributes.getResponse();
		response.setHeader("Content-type", "application/json");
		response.setStatus(502);
		response.setCharacterEncoding("utf-8");
		response.setHeader("msg",msg);
	}

	public String getClientIp(HttpServletRequest request){
		String clientIp = request.getHeader("clientIp");
		//如果请求头中没有ip，则为本地测试，使用默认值了
		if(StringUtils.isEmpty(clientIp)){
			clientIp = VoteConstants.DEFUALT_CLIENTIP;
		}
		return clientIp;
	}

}
