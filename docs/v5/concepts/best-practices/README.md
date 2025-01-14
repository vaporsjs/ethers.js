-----

Documentation: [html](https://docs.vapors.io/)

-----

Best Practices
==============

Network Changes
---------------

```
// Force page refreshes on network changes
{
    // The "any" network will allow spontaneous network changes
    const provider = new vapors.providers.Web3Provider(window.vapory, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
            window.location.reload();
        }
    });
}
```

