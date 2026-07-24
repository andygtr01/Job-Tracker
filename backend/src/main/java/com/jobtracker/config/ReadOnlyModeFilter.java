package com.jobtracker.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ReadOnlyModeFilter extends OncePerRequestFilter {

    @Value("${app.demo.readonly:false}")
    private boolean modoSomenteLeitura;

    private static final java.util.Set<String> METODOS_BLOQUEADOS =
            java.util.Set.of("POST", "PUT", "DELETE", "PATCH");

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain filterChain) throws ServletException, IOException {

        boolean ehApi = request.getRequestURI().startsWith("/api");
        boolean metodoBloqueado = METODOS_BLOQUEADOS.contains(request.getMethod());

        if (modoSomenteLeitura && ehApi && metodoBloqueado) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write(
                "{\"erro\":\"Modo demonstração\",\"mensagem\":\"Este é um ambiente de demonstração pública. Edições, criações e exclusões estão desabilitadas.\"}"
            );
            return;
        }

        filterChain.doFilter(request, response);
    }
}
