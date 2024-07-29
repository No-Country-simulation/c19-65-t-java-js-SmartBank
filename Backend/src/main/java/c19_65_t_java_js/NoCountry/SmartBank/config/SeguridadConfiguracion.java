package c19_65_t_java_js.NoCountry.SmartBank.config;


import c19_65_t_java_js.NoCountry.SmartBank.service.ClienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;


import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;

import static org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter.Directive.COOKIES;

@Configuration
@EnableWebSecurity
//@EnableMethodSecurity
public class SeguridadConfiguracion {


    @Autowired
    private ClienteServicio clienteServicio;


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf->csrf.disable() )// se desactivo para hacer pruebas en
                // postman
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/css/**", "/images/**", "/js/**",
                                "/**")
                        .permitAll().anyRequest().authenticated()

                )
                .formLogin(formLogin -> formLogin.loginPage("/iniciarsesion")
                        .loginProcessingUrl("/logincheck")
                        .usernameParameter("email")
                        .passwordParameter("contrasenia")
                        .defaultSuccessUrl("/clientes/enlistar")
                        .permitAll())
                .logout(logout -> logout.logoutUrl("/cerrarsesion").logoutSuccessUrl("/")
                        .deleteCookies("JSESSIONID")
                        .deleteCookies("our-custom-cookie")
                        .addLogoutHandler(new HeaderWriterLogoutHandler(
                                new ClearSiteDataHeaderWriter(
                                        COOKIES)))
                        .permitAll())
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                        .invalidSessionUrl("/invalidSession")// invalida la
                        // sesion
                        // cuando no se
                        // utiliza en
                        // tiempo
                        // determinado
                        .maximumSessions(1)// Numero de sesiones permitidas
                        .maxSessionsPreventsLogin(false)
                        .sessionRegistry(sessionRegistry()))
                .sessionManagement((session) -> session.sessionFixation(
                        (sessionFixation) -> sessionFixation.newSession()))
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(clienteServicio).passwordEncoder(new BCryptPasswordEncoder());
    }

}
