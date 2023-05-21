package com.example.magicpot;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Random;

public class ResultActivity extends AppCompatActivity {

    private AdView mAdview;
    private InterstitialAd mInterstitialAd;

    private static int clickCount = 1;
    private String TAG = "ResultActivity";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        // Ad initialize
        MobileAds.initialize(this, new OnInitializationCompleteListener() { //광고 초기화
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) {
            }
        });


        // Banner ad
        mAdview = findViewById(R.id.adView);
        AdRequest bannerAdRequest = new AdRequest.Builder().build();
        mAdview.loadAd(bannerAdRequest);
        AdView adView = new AdView(this);


        // Full ad
        AdRequest fullAdRequest = new AdRequest.Builder().build();
        InterstitialAd.load(this,"ca-app-pub-3940256099942544/1033173712", fullAdRequest,
            new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull InterstitialAd interstitialAd) {
                    // The mInterstitialAd reference will be null until
                    // an ad is loaded.
                    mInterstitialAd = interstitialAd;

                    mInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                        @Override
                        public void onAdClicked() {
                            // Called when a click is recorded for an ad.
                        }

                        @Override
                        public void onAdDismissedFullScreenContent() {
                            // Called when ad is dismissed.
                            //Log.d(TAG, ">>>> onAdDismissedFullScreenContent");
                            goToMainActivity();
                        }

                        @Override
                        public void onAdFailedToShowFullScreenContent(AdError adError) {
                            // Called when ad fails to show.
                            //Log.d(TAG, ">>>> onAdFailedToShowFullScreenContent");
                            goToMainActivity();
                        }

                        @Override
                        public void onAdImpression() {
                            // Called when an impression is recorded for an ad.
                        }

                        @Override
                        public void onAdShowedFullScreenContent() {
                            // Called when ad is shown.
                        }
                    });
                }
                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                    // Handle the error

                    mInterstitialAd = null;
                }

            });


        // Select random messages
        Random rand = new Random();
        int idx = rand.nextInt(114); // 0~111

        String result = null;
        try {
            result = getJsonString(idx);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }


        TextView result_text = (TextView) findViewById(R.id.result_message);
        result_text.setText(result);

        ImageButton imageButton = (ImageButton) findViewById(R.id.go_to_main_page);
        imageButton.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View v) {
                //Log.d(TAG, "clickCount : " + Integer.toString(clickCount));
                if (clickCount % 3 == 0){
                    clickCount = 1;
                    if(mInterstitialAd != null) {
                        mInterstitialAd.show(ResultActivity.this);
                    }
                }else{
                    clickCount++;
                    goToMainActivity();
                }
            }
        });
    }

    public String getJsonString(int idx) throws JSONException {
        String json = "";

        try {
            InputStream inputStream = getAssets().open("message.json");
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

            for(int i=0; i<idx; i++){
                json = reader.readLine();
            }

            reader.close();

        }catch (Exception e){
            e.printStackTrace();
        }

        JSONObject jsonObject = new JSONObject(json);
        return jsonObject.getString("name");
    }

    public void goToMainActivity() {
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        startActivity(intent);
    }
}
