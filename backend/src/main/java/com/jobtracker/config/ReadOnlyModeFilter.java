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
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(
                "{\"erro\":\"Ambiente de demonstração\",\"mensagem\":\"Para preservar os dados de exemplo, o autor deste projeto desabilitou intencionalmente criação, edição e exclusão neste ambiente público. Você pode visualizar as vagas normalmente, ou clonar o repositório no GitHub para rodar com todas as funcionalidades liberadas.\"}"
            );
            return;
        }
        filterChain.doFilter(request, response);
    }
}
