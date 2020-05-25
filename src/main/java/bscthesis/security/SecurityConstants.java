package bscthesis.security;

public class SecurityConstants {
    public static final String SECRET = "TajniKljucZaGeneriranjeJWT";
    public static final long EXPIRATION_TIME = 864000000; //10 dana
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/users/sign-up";
}
