package tomek;

import org.scribe.builder.ServiceBuilder;
import org.scribe.model.*;
import org.scribe.oauth.OAuthService;

import java.io.IOException;

/**
 * Created by tomek
 */
public class SimpleClient {


    public static void main(String[] args) throws IOException {

        OAuthService service = new ServiceBuilder()
                .provider(MyApiService.class)
                .apiKey("12345")
                .apiSecret("12345")
                .build();

        Token token = MyApiService.getToken("foo", "bar", "12345", "67890");

        System.out.println("Token: " + token);

        OAuthRequest request = new OAuthRequest(Verb.GET, "http://localhost:3000/users");
        service.signRequest(token, request);     // token secret is not used in OAuth 2.0
        Response response = request.send();
        System.out.println(response.getBody());

    }

}
