package com.minimalist.todolist.config;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.domain.ReactiveAuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import reactor.core.publisher.Mono;

import java.util.Optional;

public class SpringSecurityAuditorAware implements ReactiveAuditorAware<String> {
    @Override
    public Mono<String> getCurrentAuditor() {
        
        return ReactiveSecurityContextHolder.getContext()
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getPrincipal)
                .map(principal -> {
                    if (principal instanceof User) {
                        return ((User) principal).getUsername(); // Assuming User has getId() method.
                    } else if (principal instanceof String) {
                        return (String) principal; // Already a user ID
                    } else {
                        throw new IllegalStateException("Unexpected principal type: " + principal.getClass());
                    }
                });
    }
}
